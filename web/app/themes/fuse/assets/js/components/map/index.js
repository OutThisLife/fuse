import React, { Component } from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import init from './init'
import Filters from './filters'
import Listings from '../listings'
import FuseMap from './map'
import RangeDropdown from './filters/RangeDropdown'

const Loading = styled.div`
font-size: 12px;
text-align: center;
padding: 15px;
`

const MapGrid = styled.div`
  display: flex;
  height: calc(100vh - 138px);
`
const ListingContainer = styled.div`
  width: 50%;
  overflow-y: scroll;
  padding: 0 20px;
`

const Title = styled.div`
display: flex;
align-items: center;
padding: 20px 0;

h4 {
  font-size: 17px;
  font-family: "Arial", sans-serif;
  font-weight: 600;
  margin: 0;
}

form {
  margin: 0 0 0 auto;

  select {
    display: inline-block;
    vertical-align: middle;
    width: auto;
  }
}
`

export default class Map extends Component {
  constructor(props) {
    super(props)

    this.state = {
      all: [],
      listings: [],
      meta: {
        count: 0,
        list_price_max: 0,
        list_price_min: 1000000
      },
      agentId: null,
      baths: [],
      bedrooms: [],
      stories: [],
      property_type: [],
      status: [],
      school_district: [],
      year_built: [],
      order: {
        key: 'created_at',
        dir: 'asc'
      }
    }

    this.updateProperties = this.updateProperties.bind(this)
  }

  componentWillMount() {
    const keyword = location.search.split('q=')[1]

    if (keyword) {
      init.call(this, { keyword })
    } else {
      init.call(this)
    }
  }

  updateProperties(state) {
    this.setState(state)
  }

  handleSort({ currentTarget }) {
    const parts = currentTarget.value.split(':')
    const key = parts[0]
    const dir = parts[1] || 'asc'

    this.setState({
      order: { key, dir }
    })
  }

  render() {
    if (this.state.all.length === 0) {
      return (
        <div style={{
          textAlign: 'center',
          padding: '15px'
        }}>
          <img src='/app/themes/fuse/assets/img/ajax-loader.gif' />
        </div>
      )
    }

    return (
      <div>
        {!this.props.agentId && (
          <Filters
            updateProperties={this.updateProperties}
            {...this.state}
          />
        )}

        <MapGrid>
          <ListingContainer>
            <Title>
              {this.state.meta && (<h4>{this.state.meta.count} Real Estate & Homes for Sale</h4>)}

              <form action='javascript:;'>
                <RangeDropdown
                  name='sort_by'
                  defaultOption='Sort By'
                  defaultValue='created_at'
                  options={[
                    'list_price:asc',
                    'list_price:desc',
                    'created_at'
                  ]}
                  labels={[
                    'Price, Low to High',
                    'Price, High to Low',
                    'New Listings First'
                  ]}
                  className='background-left'
                  onChange={this.handleSort.bind(this)}
                />
              </form>
            </Title>

            <div className="map-listings">
              <Listings {...this.state} />
            </div>
          </ListingContainer>

          <FuseMap {...this.state} />
        </MapGrid>
      </div>
    )
  }
}

let $map
if ($map = document.getElementById('search-map'))
  render(<Map agentId={$map.dataset.agentid} />, $map)
