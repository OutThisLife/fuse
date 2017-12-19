import Chart from 'chart.js'

window.chartColors = {
	orange: 'rgb(241, 137, 3)',
	gold: 'rgb(254, 197, 47)',
	darkGrey: 'rgb(86, 88, 90)',
	lightGrey: 'rgb(237, 237, 237)',
};

export default class DoughnutChart {
    constructor($ctx) {
        this.$ctx = $ctx
        
        this.data = {
            propertyInterest: 729,
            propertyTax: 113,
            homeInsurance: 75,
            other: 0
        }

        this.initChart()
    }

    initChart() {
        const chart = new Chart(this.$ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [
                        this.data.propertyInterest,
                        this.data.propertyTax,
                        this.data.homeInsurance,
                        this.data.other,
                    ],
                    borderWidth: 0,
                    backgroundColor: [
                        window.chartColors.orange,
                        window.chartColors.gold,
                        window.chartColors.darkGrey,
                        window.chartColors.lightGrey,
                    ],
                }],
                labels: [
                    "Property & Interest", 
                    "Property Tax", 
                    "Home Insurance", 
                    "Other"
                ],
            },
            options: {
                responsive: true,
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                legend: {
                    display: false
                }
            }
        }) 
    }
}