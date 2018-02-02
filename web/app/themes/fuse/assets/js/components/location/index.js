import React, { Component } from 'react'
import { render } from 'react-dom'
import wpfetch from '../../helpers/wpfetch'
import kformat from '../../helpers/kformat'
import Carousel from '../Carousel'

const Stat = ({ i, title, copy }) => copy ? (
  <figure>
    <div>
      <i className={`icon-${i}`} />
    </div>

    <figcaption>
      <h5>{title}</h5>
      <p>{copy}</p>
    </figcaption>
  </figure>
) : null

export default class Location extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    wpfetch('getProperties', {
      id: location.pathname.split('/')[2]
    }, ({ results: [result] }) => this.setState({ result }))
  }

  componentDidUpdate () {
    document.title = this.state.result.postal_address

    if (this.$carousel) {
      window.requestAnimationFrame(() => {
        this.carousel = new Carousel(this.$carousel)
      })
    }
  }

  render () {
    if (!this.state.result) {
      return <div>Loading.</div>
    }

    const {
      image_urls: { all_big },
      list_price,
      internet_remarks,

      street_address,
      city, state, zip,

      num_bedrooms,
      total_baths,
      square_feet,

      status,
      listing_agent_name,
      mls_number,
      estimated_taxes,
      property_type,
      list_date,
      lot_size,
      price_per_sq_feet,
      year_built,
      heat,
      ac,
      parking_spaces,

      main_level_beds,
      other_level_beds,
      master_on_main,
      master_description,

      full_baths,
      half_baths,

      floor,

      dining,
      living,
      rooms,

      fireplace,
      fireplace_description,

      interior_features,

      construction,
      roof,
      exterior_features
    } = this.state.result

    return (
      <span>
        {all_big.length > 0 && (
          <div id='masthead' role='banner'>
            <div
            className='breadcrumb'
            onClick={() => (window.location = '/search')}
            style={{ cursor: 'pointer' }}
          >
              <div className='wrapper'>
                &lt; Back to Search <span>(
                  For Sale &gt;&nbsp;
                  {state} &gt;&nbsp;
                  {city} &gt;&nbsp;
                  {zip} &gt;&nbsp;
                  {street_address}
                )</span>
              </div>
            </div>

            <div className='hero carousel' ref={c => (this.$carousel = c)}>
              {all_big.map(src => (
                <figure key={src} className='item' style={{
                  backgroundImage: `url(${src})`,
                  backgroundAttachment: 'initial'
                }} />
              ))}

              <nav>
                {all_big.map(() => <a key={Math.random()} href='javascript:;' />)}
              </nav>
            </div>
          </div>
        )}

        <div id='content'>
          <div className='row skinny wrapper page-content'>
            <div className='location-info flex'>
              <div>
                <h5>For sale</h5>
                <strong className='price'>{kformat(list_price)}</strong>

                <address>
                  {street_address} | {city} {zip}
                </address>

                <div className='meta-columns'>
                  {num_bedrooms > 0 && (
                    <div className='bed'>
                      <strong>{num_bedrooms}</strong>
                      <small>BR</small>
                    </div>
                  )}

                  {full_baths > 0 && (
                    <div className='bath'>
                      <strong>{full_baths}</strong>
                      <small>BA</small>
                    </div>
                  )}

                  {square_feet > 0 && (
                    <div className='square-foot'>
                      <strong>{square_feet.toLocaleString()}</strong>
                      <small>SQ/FT</small>
                    </div>
                  )}
                </div>
              </div>

              <aside>
                <p>{internet_remarks}</p>
              </aside>
            </div>

            <div className='location-stats flex'>
              <Stat i='status' title='Status' copy={status} />
              <Stat i='listing' title='Listing' copy={listing_agent_name} />
              <Stat i='mls' title='MLS #' copy={mls_number} />
              <Stat i='prop-tax' title='Prop. Taxes' copy={estimated_taxes} />
              <Stat i='prop-type' title='Type' copy={property_type} />

              <Stat i='days' title='Days on FUSE' copy={(() => {
                const today = new Date().getTime()
                const compare = new Date(list_date).getTime()
                return Math.ceil(Math.abs(compare - today) / (1000 * 3600 * 24))
              })()} />

              <Stat i='acres' title='Lot Size' copy={lot_size} />
              <Stat i='price-sqft' title='Price/SQFT' copy={price_per_sq_feet} />
              <Stat i='calendar' title='Year Built' copy={year_built} />
              <Stat i='heating' title='Heating' copy={heat} />
              <Stat i='cooling' title='Cooling' copy={ac} />
              <Stat i='parking' title='Parking' copy={parking_spaces} />
            </div>

            <div className='interior-info'>
              <h3>Interior</h3>

              <div className="flex">
                <div>
                  <h5>Bedrooms</h5>
                  Beds (Main Level): {main_level_beds || 0}<br />
                  Beds (Off Main Level): {other_level_beds || 0}<br />
                  {master_on_main === 'Y' && 'Has Master on Main Level'}<br />
                  {master_description}
                </div>

                <div>
                  <h5>Cooling &amp; Heating</h5>
                  Air Conditioning: {ac}
                </div>

                <div>
                  <h5>Bathrooms</h5>
                  Baths (Full): {full_baths}<br />
                  Baths (Half): {half_baths}
                </div>

                <div>
                  <h5>Floors</h5>
                  Floors: {floor}
                </div>

                <div>
                  <h5>Rooms</h5>
                  Dining Rooms: {dining}<br />
                  Living Rooms: {living}<br />
                  Other rooms: {rooms}
                </div>

                <div>
                  <h5>Fireplace</h5>
                  Fireplaces: {fireplace}<br />
                  Fireplace Features: {fireplace_description}
                </div>

                <div>
                  <h5>Other Interior Features</h5>
                  {interior_features}
                </div>
              </div>

              <hr />

              <h3>Interior</h3>

              <div className='flex'>
                <div>
                  <h5>Type and Style</h5>
                  {property_type}
                </div>

                <div>
                  <h5>Materials</h5>
                  Roof type: {roof}
                </div>
              </div>
            </div>
          </div>
        </div>
      </span>
    )
  }
}

let $location
if ($location = document.getElementById('single-location')) {
  render(<Location {...$location.dataset} />, $location)
}
