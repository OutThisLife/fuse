import React, { Component } from 'react'
import { render } from 'react-dom'
import { Doughnut } from 'react-chartjs-2'

const setChart = ({ propertyInterest, propertyTax, homeInsurance, total }) => ({
  propertyInterest,
  propertyTax,
  homeInsurance,
  total,
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
        homeInsurance
      ],
    }],
    labels: [
      "Property & Interest",
      "Property Tax",
      "Home Insurance"
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
    this.calculateMortgage()
  }

  calculateMortgage(e) {
    if (e) {
      e.preventDefault()
    }

    const formData = {
      purchasePrice: parseFloat(this.$form.purchasePrice.value || 300000),
      loanAmount: parseFloat(this.$form.loanAmount.value || 250000),
      interestRate: parseFloat(this.$form.interestRate.value || 3.92),
      loanType: parseFloat(this.$form.loanType.value || 30)
    }

    const principal = formData.loanAmount
    const monthlyInterestRate = formData.interestRate / 12 / 100
    const numberOfMonthlyPayments = Math.max(1, formData.loanType) * 12
    const monthlyPayment = parseInt((monthlyInterestRate * principal * Math.pow((1 + monthlyInterestRate), numberOfMonthlyPayments)) / (Math.pow((1 + monthlyInterestRate), numberOfMonthlyPayments) - 1))

    const propertyInterest = parseInt(monthlyPayment)
    const propertyTax = parseInt((formData.purchasePrice * 0.027) / 12)
    const homeInsurance = parseInt((formData.purchasePrice / 1000) * 0.350)

    this.setState(setChart({
      propertyInterest: formData.loanType === 0 ? 0 : propertyInterest,
      propertyTax,
      homeInsurance,
      total: propertyInterest + propertyTax + homeInsurance
    }))
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

          <strong className="center">$<span>{this.state.total}</span> /mo</strong>
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
        </ul>
      </div>

      <div className="col s12 m6 mortgage-form-wrapper">
        <label htmlFor="purchase-price">
        <span>Purchase Price</span>
          <input type="text" name="purchasePrice" placeholder="$300,000" />
        </label>

        <label htmlFor="loan-amount">
          <span>Loan Amount <a href="javascript:;">?</a></span>
          <input type="text" name="loanAmount" placeholder="$250,000" />
        </label>

        <label htmlFor="interest-rate">
          <span>Interest Rate <a href="javascript:;">?</a></span>
          <input type="text" name="interestRate" placeholder="3.92%" />
        </label>

        <label htmlFor="loan-type">
          <span>Loan Type <a href="javascript:;">?</a></span>
          <select name="loanType" onChange={this.calculateMortgage.bind(this)}>
            <option value="30">30 Year Fixed Rate</option>
            <option value="15">15 Year Fixed Rate</option>
            <option value="0">No Loan</option>
          </select>
        </label>
      </div>
    </div>

    <div className="grey-banner center-align">
      <strong>$<span className="price">{this.state.total}</span> /mo</strong><br />
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
