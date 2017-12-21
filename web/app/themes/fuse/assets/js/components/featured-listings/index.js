import React, { Component } from 'react'
import { render } from 'react-dom'
import Slider from 'react-slick'
import init from '../map/init'
import Listing from '../listings/listing'

const Arrow = ({ className, style, onClick }) => {
  return (
    <span
      className={className}
      onClick={onClick}
    >
      <span></span>
    </span>
  )
}

export default class FeaturedListings extends Component {
  constructor(props) {
    super(props)

    this.state = { listings: [] }
    this.settings = {
      dots: false,
      infinite: false,
      speed: 500,
      initialSlide: 0,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: true,
      nextArrow: <Arrow />,
      prevArrow: <Arrow />,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    }
  }

  componentWillMount() {
    init.call(this)
  }

  render() {
    const Dummy = ({ children }) => {
      if (this.state.listings.length >= 4) {
        return (
          <Slider {...this.settings}>
            {children}
          </Slider>
        )
      }

      return <div className='static-track'>{children}</div>
    }

    return (
      <div className="row featured-listings">
        <Dummy>
        {(this.state.listings || []).map(listing =>
          <div key={listing.id}>
            <Listing
              listing_id={listing.id}
              image={listing.image_urls.primary_big}
              status={listing.status}
              price={listing.list_price}
              address={listing.street_address}
              city={listing.city}
              zip={listing.zip}
              bedrooms={listing.num_bedrooms}
              full_baths={listing.full_baths}
              half_baths={listing.half_baths}
              square_feet={listing.square_feet}
            />
          </div>
        )}
        </Dummy>
      </div>
    )
  }
}

let $featuredListings
if ($featuredListings = document.getElementById('featured-listings'))
  render(<FeaturedListings
    agentId={$featuredListings.dataset.agentid}
  />, $featuredListings)
