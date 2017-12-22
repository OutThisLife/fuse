import React from 'react'
import { orderBy } from 'lodash'
import Listing from './listing'

const Listings = ({ listings, order }) => (
  <div className="listing-container">
    {orderBy(listings || [], [order.key], [order.dir]).map(listing =>
      <Listing
        key={listing.id}
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
    )}
  </div>
)

export default Listings
