import React, { PureComponent } from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import { compose, withProps, withStateHandlers } from 'recompose'
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
    Polygon
} from "react-google-maps"
import kformat from '../../helpers/kformat'

const MapContainer = styled.div`
width: 50%
`

const Label = styled.div`
color: white;
background-color: #F28B1F;
text-align: center;
padding: 6px 12px;
border-radius: 8px;
border: 1px solid white;
position: relative;
`

const DownArrow = styled.div`
position: relative;
left: 50%;
width: 0;
height: 0;
border: 5px solid transparent;
border-top-color: #F28B1F;
margin: -2px 0 0 -5px;
`

export default class Map extends PureComponent {
  componentDidMount () {
    this.onResize = this.handleResize.bind(this)
  }

  shouldComponentUpdate ({ listings }) {
    return listings.length !== this.props.listings
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  }

  handleMapLoad(map) {
    if (!map) {
      return
    }

    this.map = map
    this.infoWindow = new google.maps.InfoWindow({
      content: 'null',
      pixelOffset: new google.maps.Size(-120, 50)
    })

    const bounds = new window.google.maps.LatLngBounds()
    const paths = []

    if (this.props.listings) {
      for (const property of this.props.listings) {
        if (property.latitude) {
          bounds.extend(this.getLatLng(property))
        }
      }

      map.fitBounds(bounds)
      window.addEventListener('resize', this.onResize)
    }
  }

  extractLatLng(property) {
    const { latitude, longitude } = property
    return [parseFloat(latitude), parseFloat(longitude)]
  }

  getLatLng(marker) {
    const [latitude, longitude] = this.extractLatLng(marker)
    return new window.google.maps.LatLng(latitude, longitude)
  }

  handleTilesLoaded() {
    const
      listings = [],
      bounds = this.map.getBounds()

    for (const property of this.props.listings) {
      if (bounds.contains(this.getLatLng(property))) {
        listings.push(property)
      }
    }

    this.props.handleUpdate(listings, false)
  }

  getPoly(bounds, mapCenter) {
    const center = bounds.getCenter()
    const paths = []

    const north = bounds.getNorthEast().lat()
    const east = bounds.getNorthEast().lng()
    const south = bounds.getSouthWest().lat()
    const west = bounds.getSouthWest().lng()

    paths.push({ lat: south, lng: west })
    paths.push({ lat: south, lng: center.lng() })
    paths.push({ lat: south, lng: east })
    paths.push({ lat: center.lat(), lng: east })
    paths.push({ lat: north, lng: east })
    paths.push({ lat: north, lng: mapCenter.lng() })
    paths.push({ lat: north, lng: west })
    paths.push({ lat: mapCenter.lat(), lng: west })

    return new window.google.maps.Polygon({
      paths,
      strokeColor: "#6666FF",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#6666FF",
      fillOpacity: 0.35
    })
  }

  handleResize () {
    this.forceUpdate()
  }

  render() {
    const styles = [ { "featureType": "all", "elementType": "all", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "administrative", "elementType": "all", "stylers": [ { "visibility": "on" } ] }, { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [ { "color": "#444444" } ] }, { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [ { "weight": "1.2" } ] }, { "featureType": "administrative.province", "elementType": "all", "stylers": [ { "visibility": "on" } ] }, { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [ { "weight": "1" }, { "visibility": "off" } ] }, { "featureType": "administrative.neighborhood", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "landscape", "elementType": "all", "stylers": [ { "color": "#f2f2f2" } ] }, { "featureType": "poi", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.business", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "all", "stylers": [ { "visibility": "on" } ] }, { "featureType": "road", "elementType": "all", "stylers": [ { "saturation": -100 }, { "lightness": 45 }, { "visibility": "on" } ] }, { "featureType": "road.highway", "elementType": "all", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit", "elementType": "all", "stylers": [ { "visibility": "on" } ] }, { "featureType": "transit.station", "elementType": "all", "stylers": [ { "visibility": "on" } ] }, { "featureType": "water", "elementType": "all", "stylers": [ { "color": "#b4d2dc" } ] } ]

    const GMAP = withScriptjs(withGoogleMap(props => {
      return (<GoogleMap
        ref={props.onMapLoad}
        defaultOptions={{ styles }}
        defaultZoom={16}
        defaultCenter={{
          lat: 30.3074624,
          lng: -98.0335911,
        }}
      >
        {(this.props.listings || []).map(listing => {
          const lat = parseFloat(listing.latitude)
          const lng = parseFloat(listing.longitude)

          return (
            <MarkerWithLabel
              position={{ lat, lng }}
              key={listing.id}
              labelAnchor={new google.maps.Point(0,0)}
              opacity={0}
            >
              <div>
                <Label>
                  {kformat(Math.floor(listing.list_price))}
                </Label>
                <DownArrow />
              </div>
            </MarkerWithLabel>
          )
        })}

        <Polygon ref={c => (this.$poly = c)} />
      </GoogleMap>)
    }))

    return (
      <MapContainer>
        <GMAP
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBA86n2UxfTJi0ThEg6-nPk5cH-rffwdLc&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div className="loading-map" />}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          onMapLoad={this.handleMapLoad.bind(this)}
        />
      </MapContainer>
    )
  }
}
