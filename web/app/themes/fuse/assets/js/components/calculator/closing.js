import React, { Component } from 'react'
import Tabs from '../tabs'
import { render } from 'react-dom'

class ClosingCalculator extends Component {
  componentDidMount () {
    new Tabs(this.$tabs)
  }

  render () {
    return (
      <div>
        <div className="row">
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

                                <label htmlFor="down-payment-amount">
                                    <span>Down Payment Amount</span>
                                    <p>$12,500</p>
                                </label>

                                <label htmlFor="total-loan-amount">
                                    <span>Down Payment Amount</span>
                                    <p>237,500%</p>
                                </label>
                            </div>
                            <div className="col m6 s12">
                                <label htmlFor="loan-term">
                                    <span>Loan Term <a href="javascript:;">?</a></span>
                                    <select name="loan-type">
                                        <option>30 Years</option>
                                        <option>No Loan</option>
                                    </select>
                                </label>
                                <label htmlFor="loan-type">
                                    <span>Loan Type <a href="javascript:;">?</a></span>
                                    <select name="loan-type">
                                        <option>Fixed Rate</option>
                                        <option>No Loan</option>
                                    </select>
                                </label>

                                <label htmlFor="zipcode">
                                    <span>Zipcode</span>
                                    <input type="text" name="zipcode" placeholder="Property Zipcode" />
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
            <a href="javascript:;" className="btn calculate">Calculate</a>
        </div>
      </div>
    )
  }
}


const $calculator = document.getElementById('closing-calculator')
if ($calculator)
    render(<ClosingCalculator />, $calculator)
