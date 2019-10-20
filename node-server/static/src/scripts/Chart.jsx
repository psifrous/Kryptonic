import React, { Component } from 'react'
import CanvasJSReact from './../assets/canvas/canvasjs.react'
let CanvasJS = CanvasJSReact.CanvasJS
let CanvasJSChart = CanvasJSReact.CanvasJSChart

export default class Chart extends Component {
	constructor() {
		super()
		this.state = { total: [], options: {} }
	}

	async getData() {
		try {
			let data = await fetch('http://13.90.227.9/query?days=10&coin=BTC')
			data = await data.text()
			return data
		} catch (err) {
			console.error(err)
		}
	}

	async componentWillMount() {
		CanvasJS.addColorSet('greenShades', [
			'#2F4F4F',
			'#008080',
			'#2E8B57',
			'#3CB371',
			'#90EE90'
		])
		try {
			let data = await this.getData()
			data = data.split('\n')

			for (let i = 1; i < 100	; i++) {
				const e = data[i].split(',')
				this.state.total.push({
					x: parseInt(e[0], 10),
					y: parseInt(e[1], 10)
				})
			}
			// console.log(this.state.total)

			this.setState({
				options: {
					animationEnabled: true,
					zoomEnabled: true,
					theme: 'light1',
					title: {
						// text: 'Data Plot'
					},
					axisY: {
						title: 'Price in USD',
						prefix: '$',
						includeZero: false
					},
					legend: {
						cursor: 'pointer',
						verticalAlign: 'top',
						horizontalAlign: 'center',
						dockInsidePlotArea: true
						// itemclick: toogleDataSeries
					},
					data: [
						{
							color: 'rgba(12,143,221,.5)',
							type: 'line',
							name: 'plot',
							showInLegend: true,
							dataPoints: this.state.total
						}
					]
				}
			})
		} catch (err) {
			console.log('API Down')
		}
	}

	componentDidMount() {
		let chart = this.chart
		chart.render()
	}

	render() {
		return (
			<div>
				<CanvasJSChart
					options={this.state.options}
					onRef={ref => (this.chart = ref)}
				/>
			</div>
		)
	}
}
