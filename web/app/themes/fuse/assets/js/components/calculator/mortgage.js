import React, { Component } from 'react'
import { render } from 'react-dom'
import { Doughnut } from 'react-chartjs-2'

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const setChart = (propertyInterest, propertyTax, homeInsurance, other, monthlyMortgage) => ({
  propertyInterest,
  propertyTax,
  homeInsurance,
  other,
  monthlyMortgage,
  chartData: {
    datasets: [{
      backgroundColor: [
        'rgb(241, 137, 3)',
        'rgb(254, 197, 47)',
        'rgb(86, 88, 90)',
        'rgb(237, 237, 237)'
      ],
      borderWidth: 0,
      data: [
        propertyInterest,
        propertyTax,
        homeInsurance,
        other
      ],
    }],
    labels: [
      "Property & Interest",
      "Property Tax",
      "Home Insurance",
      "Other"
    ]
  }
})

export default class MortgageCalculator extends Component {
  constructor(props) {
    super(props)
    this.setState(setChart(
      729, 113, 75, 0, 917
    ))
  }

  componentWillMount() {
    this.setState(setChart(
      729, 113, 75, 0, 917
    ))
  }

  componentDidMount() {
    this.$form = document.getElementById('mortgage-form')
  }

  calculateMortgage(e) {
    e.preventDefault()

    const formData = {
      zipcode: this.$form.zipcode.value,
      purchasePrice: parseFloat(this.$form.purchasePrice.value || 250000),
      downPayment: parseFloat(this.$form.downPayment.value || 0.05),
      interestRate: parseFloat(this.$form.interestRate.value || 0.343),
      loanType: parseFloat(this.$form.loanType.value || 30)
    }
    const principal = formData.purchasePrice - (formData.purchasePrice * formData.downPayment)
    const monthlyInterestRate = (formData.interestRate / 12) / 100
    const numberOfMonthlyPayments = formData.loanType * 12
    const monthlyPayment = (monthlyInterestRate * principal * Math.pow((1 + monthlyInterestRate), numberOfMonthlyPayments)) / (Math.pow((1 + monthlyInterestRate), numberOfMonthlyPayments) - 1)

    this.setState(setChart(
      Math.floor(monthlyPayment),
      getRandomInt(100, 200),
      getRandomInt(100, 150),
      getRandomInt(0, 100),
      Math.floor(monthlyPayment)
    ))
  }

  render() {
    return (<form id="mortgage-form" onSubmit={this.calculateMortgage.bind(this)}>
    <div className="row wrapper calculator-form">
      <div className="col s12 m6 percentage-breakdown">
        <figure className="percentage-wheel">
          <Doughnut
            data={this.state.chartData}
            height={278}
            width={278}
            options={{
              cutoutPercentage: 75,
              maintainAspectRatio: false,
              legend: {
                display: false
              }
            }}
          />

          <strong className="center">$<span>{this.state.monthlyMortgage}</span> /mo</strong>
        </figure>

        <ul className="breakdown">
          <li className="principal">
           <span className="label">Principal & Interest</span>
           <span className="price">${this.state.propertyInterest}</span>
          </li>

          <li className="property-tax">
           <span className="label">Property Tax</span>
           <span className="price">${this.state.propertyTax}</span>
          </li>

          <li className="home-insurance">
           <span className="label">Home Insurance</span>
           <span className="price">${this.state.homeInsurance}</span>
          </li>

          <li className="other">
           <span className="label">Other</span>
            <span className="price">${this.state.other}</span>
          </li>
        </ul>
      </div>

      <div className="col s12 m6 mortgage-form-wrapper">
        <label htmlFor="zipcode">
          <span>Zipcode</span>
          <input type="text" name="zipcode" placeholder="Property Zipcode" />
        </label>

        <label htmlFor="purchase-price">
        <span>Purchase Price</span>
          <input type="text" name="purchasePrice" placeholder="$250,000" />
        </label>

        <label htmlFor="down-payment">
          <span>Down Payment <a href="javascript:;">?</a></span>
          <select name="downPayment" onChange={this.calculateMortgage.bind(this)}>
            <option value="0.05">5%</option>
            <option value="0.1">10%</option>
            <option value="0.2">20%</option>
          </select>
        </label>

        <label htmlFor="interest-rate">
          <span>Interest Rate <a href="javascript:;">?</a></span>
          <input type="text" name="interestRate" placeholder="3.43%" />
        </label>

        <label htmlFor="loan-type">
          <span>Loan Type <a href="javascript:;">?</a></span>
          <select name="loanType" onChange={this.calculateMortgage.bind(this)}>
            <option value="30">30 Year Fixed Rate</option>
            <option>No Loan</option>
          </select>
        </label>
      </div>
    </div>

    <div className="grey-banner center-align">
      <strong>$<span className="price">{this.state.monthlyMortgage}</span> /mo</strong><br />

      <small>
        <span className="loan-type">30 - Year Fixed</span> |
        < span className="interest-rate">3.43% Interest</span>
      </small>
    </div>

    <div className="center-align">
      <button type="submit" href="javascript:;" className="btn calculate">Calculate</button>
    </div>
    </form>)
  }
}

const $calculator = document.getElementById('mortgage-calculator')
if ($calculator)
render(<MortgageCalculator />, $calculator)
