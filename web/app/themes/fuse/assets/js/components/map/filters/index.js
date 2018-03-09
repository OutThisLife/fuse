import React, { Component } from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import serialize from 'form-serialize'
import queryString from 'query-string'
import Inputmask from 'inputmask'
import wpfetch from '../../../helpers/wpfetch'
import RangeSlider from './RangeSlider'
import RangeDropdown from './RangeDropdown'
import ToggleSwitch from './ToggleSwitch'

const MapFilters = styled.form`
background: #EDEDED;
margin: 0;

select:not([readonly]) {
  border: 0px;
  background: #FFF url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAJCAMAAAA1k+1bAAAAYFBMVEX////yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/sUrGnAAAAH3RSTlMACgwPFBUXGxwkLUlQW2lyc32Ivb7EycrL09zd5vr9r5U7FwAAAFRJREFUeAFNwY0SASEYhtHHD7vsFiUR+t77v0tN0xjnMN1mhvNzIut1pDt9lFmqyoFmfqsusJoeO9gX2UrjTPfNNsscnZdSkjzDVc2FnyAF/sRI9wV84gU0jsgK2wAAAABJRU5ErkJggg==) 10px center no-repeat;
  padding-left: 30px;
}

&.loading {
  cursor: progress;
  opacity: 0.5;

  * {
    pointer-events: none;
  }

  + div > div:first-child {
    position: relative;

    &:before {
      content: '';
      z-index: 100;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(255, 255, 255, .8) url(/app/themes/fuse/assets/img/ajax-loader.gif) center no-repeat;
    }
  }
}

select:not([readonly]),
input[type=number]:not([readonly]),
input[type=text]:not([readonly]) {
  border: 0 !important;
}
`

const BasicFilters = styled.div`
display: flex;
align-items: stretch;
width: 100%;
padding: 20px 10px;
justify-content: space-between;

select:not([readonly]),
input[type=number]:not([readonly]),
input[type=text]:not([readonly])
{
  width: 120px;
  margin: 0 10px;
  border: 0 !important;
}
`

const AdvFilters = styled.div`
max-height: 0;
overflow: hidden;

&.active {
  max-height: initial;
  overflow: auto;
  padding:  10px 0;
}

> div {
  width: 65%;
  display: flex;
  padding: 10px;

  > * ~ * {
    margin-left: 10px !important;
  }
}
`

const SaveSearch = styled.strong`
width: 30%;
color: #F28B1F;
font-size: 14px;
letter-spacing: .01em;
`

const SearchContainer = styled.div`
  position: relative;
  width: 100%;

  button {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 75px;
    display: block;
    text-indent: -9999em;
    background: none;
    border: 0;
  }
`

const Button = styled.div`
  background-color: #FFF;
  color: #707270;
  text-transform: capitalize;
  letter-spacing: normal;
  box-shadow: none;
  border: 0;
  font-weight: 500;
  margin-right: 10px;
  padding-left: 30px;
  background-position-x: 10px;

  &:hover {
    background-color: #FFF;
  }

  &:before {
    content: '';
    background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAJCAMAAAA1k+1bAAAAYFBMVEX////yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/yix/sUrGnAAAAH3RSTlMACgwPFBUXGxwkLUlQW2lyc32Ivb7EycrL09zd5vr9r5U7FwAAAFRJREFUeAFNwY0SASEYhtHHD7vsFiUR+t77v0tN0xjnMN1mhvNzIut1pDt9lFmqyoFmfqsusJoeO9gX2UrjTPfNNsscnZdSkjzDVc2FnyAF/sRI9wV84gU0jsgK2wAAAABJRU5ErkJggg==) center no-repeat;
    display: block;
    position: absolute;
    left: 15px;
    top: 15px;
    height: 15px;
    width: 15px;
  }
`

const ButtonContainer = styled.div`
  width: 100% !important;
  justify-content: center;
`

const ThirdColumn = styled.div`
  width: 33% !important;
  margin: 0;

  label {
    text-align: center;
    font-weight: 700;
    margin-bottom: 15px;
  }

  select:not([readonly]) {
    width: 100% !important
  }
`

const CallToAction = styled.div `
  width: 100% !important;
  border-top: 7px solid #FFF;
  align-items: center;
  margin-bottom: 0 !important;
  padding: 20px 0;

  h4 {
    margin: 0 10px 0 0;
  }

  img {
    height: 50px;
  }

  .close {
    margin-left: auto;
    margin-right: 10px;
    text-transform: uppercase;
    font-weight: 700;
    color: #56585a;
  }
`

export default class Filters extends Component {
    constructor(props) {
      super(props)

      this.state = {
        buttonLabel: 'More'
      }

      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleExpand = this.handleExpand.bind(this)
    }

    componentDidMount () {
      const m = new Inputmask('currency', {
        rightAlign: false,
        autoUnmask: true
      })

      m.mask(this.$min)
      m.mask(this.$max)
    }

    handleSubmit(e) {
      if (!this.props.all) {
        return
      }

      this.el.classList.add('loading')

      const formData = serialize(this.el, { hash: true })

      ;['min_list_price', 'max_list_price'].map(key => {
        if (key in formData) {
          formData[key] = parseFloat(formData[key] || 0) / 1000
        }
      })

      localStorage.setItem("FormData", JSON.stringify(formData))
      localStorage.setItem("timestamp", Date.now())

      wpfetch('getProperties', formData, ({ results, meta }) => {
        this.el.classList.remove('loading')
        this.props.updateProperties({
          listings: results,
          meta,
        })
      })
    }

    handleExpand() {
      let buttonLabel

      const advancedFilters = document.querySelector('.adv-filters')
      advancedFilters.classList.toggle('active')

      buttonLabel = advancedFilters.classList.contains('active') ? 'Less' : 'More'
      this.setState({ buttonLabel })
    }

    getGroup(key) {
      return [...new Set(this.props.all.map(y => y[key]))].sort().filter(x => x)
    }

    render() {
      const yearBuilt = this.getGroup('year_built')

      return (
        <MapFilters action='javascript:;' innerRef={c => (this.el = c)} onSubmit={this.handleSubmit}>
          <BasicFilters>
            <SearchContainer>
              <input
                name="keyword"
                type="search"
                id="search"
                className="search"
                defaultValue={location.search.split('q=')[1]}
                placeholder="Search by city, zipcode, address, or MLS#"
                style={{ border: `0px`, height: '100%' }}
              />

              <button type="submit" />
            </SearchContainer>

            <input
              ref={c => (this.$min = c)}
              type='text'
              name='min_list_price'
              placeholder='Min. Price'
            />

            <input
              ref={c => (this.$max = c)}
              type='text'
              name='max_list_price'
              placeholder='Max. Price'
            />

            <RangeDropdown
              name='min_bedrooms'
              defaultOption='Bedrooms'
              defaultValue='0'
              options={[0,1,2,3,4,5]}
              labels={['Studio','1+','2+','3+','4+','5+']}
              className='background-left'
              onChange={this.handleSubmit}
            />

            <RangeDropdown
              name='min_bathrooms'
              defaultOption='Bathrooms'
              defaultValue='0'
              options={[0,1,2,3,4,5]}
              labels={['0+','1+','2+','3+','4+','5+']}
              className='background-left'
              onChange={this.handleSubmit}
            />

            <Button
              className='btn arrow-backgound background-left'
              onClick={this.handleExpand}
            >
              {this.state.buttonLabel}
            </Button>
          </BasicFilters>

          <AdvFilters className="adv-filters">
            <div>
              <input
                name='mls_number'
                type="text"
                placeholder="MLS#"
                style={{ width: `50%` }}
              />

              <RangeDropdown
                name='min_stories'
                defaultOption='Stories'
                defaultValue=""
                options={this.getGroup('stories')}
                className='background-left'
                onChange={this.handleSubmit}
              />

              <RangeDropdown
                name='property_type'
                defaultOption='Property Type'
                defaultValue="House"
                options={[
                  'House',
                  'Condo',
                  'Ranch',
                  'Land',
                  'Multi'
                ]}
                className='background-left'
                onChange={this.handleSubmit}
              />

              <RangeDropdown
                name='status'
                defaultOption='Property Status'
                defaultValue=""
                options={this.getGroup('status')}
                className='background-left'
                onChange={this.handleSubmit}
              />
            </div>

            <ThirdColumn>
              <input
                name='street_number'
                type="text"
                placeholder="Street Number"
              />

              <input
                name='street_name'
                type="text"
                placeholder="Street Name"
              />
            </ThirdColumn>

            <ThirdColumn>
              <input
                name='city'
                type="text"
                placeholder="City"
              />

              <input
                name='zip'
                type="text"
                placeholder="Zipcode"
              />
            </ThirdColumn>

            <div style={{ paddingBottom: '20px' }}>
              <ThirdColumn>
                <label>Square Footage</label>
                <RangeSlider
                  className='square_feet_slider'
                  min={this.props.meta.square_feet_min}
                  max={15000}
                  maxLabel='15,000+'
                  values={[this.props.meta.square_feet_min, 15000]}
                  onChange={this.handleSubmit}
                />

                <input type='hidden' name='min_square_feet' />
                <input type='hidden' name='max_square_feet' />
              </ThirdColumn>

              <ThirdColumn>
                <label>Year Built</label>

                <RangeSlider
                  className='year-built'
                  min={yearBuilt[0]}
                  max={yearBuilt[yearBuilt.length-1]}
                  values={[yearBuilt[0], yearBuilt[yearBuilt.length-1]]}
                  onChange={this.handleSubmit}
                />

                <input type='hidden' name='year_built_before' />
                <input type='hidden' name='year_built_after' />
              </ThirdColumn>

              <ThirdColumn>
                <label>Lot Size (acre)</label>
                <RangeSlider
                  className='lot-size'
                  min={0}
                  max={150}
                  values={[0, 150]}
                  onChange={this.handleSubmit}
                />

                <input type='hidden' name='min_acres' />
                <input type='hidden' name='max_acres' />
              </ThirdColumn>
            </div>

            <ThirdColumn>
              <RangeDropdown
                name='school'
                defaultOption='School Name'
                defaultValue=""
                options={this.getGroup('school_name')}
                className='background-left'
                onChange={this.handleSubmit}
              />

              <RangeDropdown
                name='school_district'
                defaultOption='District Name'
                defaultValue=""
                options={this.getGroup('school_district')}
                className='background-left'
                onChange={this.handleSubmit}
              />
            </ThirdColumn>

            <ThirdColumn>
              <ToggleSwitch name='pool_on_property' value={1} title='Pool' />
              <ToggleSwitch name='min_garage_spaces' value={1} title='Garage' />
              <ToggleSwitch name='waterfront' value='Y' title='waterfront' />
              <ToggleSwitch name='is_gated_community' value='Y' title='Gated' />
            </ThirdColumn>

            <ButtonContainer>
              <button type="submit" className="btn">
                Refine Search
              </button>
            </ButtonContainer>

            <CallToAction>
              <img src='http://fuse.austinkpickett.com/wp-content/themes/fuse/assets/img/properties.svg' />

              <h4>Interested in Commercial Properties?</h4>
              <a
                href='/contact/'
                className='btn'
                role='button'
              >
                Contact Us
              </a>

              <a
                onClick={this.handleExpand}
                href='javascript:;'
                className='close'
              >
                Close
              </a>
            </CallToAction>
          </AdvFilters>
        </MapFilters>
      )
    }
}
