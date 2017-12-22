import React, { PureComponent } from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import WishList from './wishlist/'

const ListingDetail = styled.div`
padding: 16px 22px;

.meta-columns:empty {
  display: none;
}
`

export default props => (
  <div className="listing" rel={props.listing_id}>
    <div className="listing-details">
      <figure style={{
        background: `url(${props.image}) center / cover no-repeat`
      }}>
        <img src={props.image} style={{ visibility: 'hidden' }} />
        <span className="tag"><strong>{props.status}</strong></span>
        <WishList />
      </figure>

      <ListingDetail>
          <div className="price-location">
            <span className="price">${props.price.toLocaleString()}</span>
            <div className="address">
                <span className="street">{props.address}</span> |&nbsp;
                <span className="city-zip">{props.city} {props.zip}</span>
            </div>
          </div>

        <div className="meta-columns">
          {props.bedrooms > 0 && (
            <div className="bed">
              <strong>{props.bedrooms}</strong>
              <small>BR</small>
            </div>
          )}

          {props.full_baths > 0 && (
            <div className="bath">
              <strong>{props.full_baths}</strong>
              <small>BA</small>
            </div>
          )}

          {props.square_feet > 0 && (
            <div className="square-foot">
              <strong>{props.square_feet.toLocaleString()}</strong>
              <small>SQ/FT</small>
            </div>
          )}
        </div>
      </ListingDetail>
    </div>
  </div>
)
