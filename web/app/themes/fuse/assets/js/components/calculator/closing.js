import React, { Component } from 'react'
import Tabs from '../tabs'
import { render } from 'react-dom'

class ClosingCalculator extends Component {
  constructor(props) {
    super(props)

    this.state = {
      purchase_price: 250000,
      down_payment: .05,
      loan_term: 30
    }

    this.percentage = {
      loan_origination_fee: 0.01,
      homeowners_insurance: 0.005,
      property_tax: 0.011
    }

    this.fixed = {
      appraisal: 350,
      inspection: 400,
      application: 300,
      attorney: 1000,
      prepaid_interest: 300,
      title_insurance: 1000,
      title_search: 500
    }

    this.calculateClosing = this.calculateClosing.bind(this)
  }

  componentDidMount () {
    new Tabs(this.$tabs)
  }

  calculateClosing() {

  }

  render () {
    return (
      <div>
        <div className="row wrapper">
            <ul className="tabs" ref={c => (this.$tabs = c)}>
                <li className="active">Buyer</li>
                <li>Seller</li>
            </ul>

            <div className="contents">
                <div className="tab-content">
                  <form className="calculator-form">
                    <div className="row form-row">
                        <div className="col m6 s12">
                          <label htmlFor="purchase-price">
                              <span>Purchase Price</span>
                              <input type="text" name="purchase-price" placeholder="$250,000" />
                          </label>

                          <label htmlFor="down-payment">
                              <span>Down Payment <a href="javascript:;">?</a></span>
                              <select name="down-payment">
                                  <option>5%</option>
                                  <option>10%</option>
                              </select>
                          </label>
                        </div>

                        <div className="col m6 s12">
                          <label htmlFor="down-payment-amount">
                              <span>Down Payment Amount</span>
                              <p>$12,500</p>
                          </label>

                          <label htmlFor="total-loan-amount">
                              <span>Total Loan Amount</span>
                              <p>237,500%</p>
                          </label>
                        </div>
                      </div>
                    </form>
                </div>
                <div className="tab-content">
                    <p>This is the seller form Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum nihil tenetur qui? Sequi, modi reiciendis ut dolor quibusdam totam labore id consectetur</p>
                </div>
            </div>
        </div>

        <div className="grey-banner center-align">
            <strong>$<span className="price">917</span> /mo</strong><br />
            <small>
                <span className="loan-type">30 - Year Fixed</span> |
                <span className="interest-rate">3.43% Interest</span>
            </small>
        </div>

        <div className="center-align">
            <a href="javascript:;" className="btn calculate" onClick={this.calculateClosing}>Calculate</a>
        </div>
      </div>
    )
  }
}


const $calculator = document.getElementById('closing-calculator')
if ($calculator)
    render(<ClosingCalculator />, $calculator)
