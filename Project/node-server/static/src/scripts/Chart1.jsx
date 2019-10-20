import React, { Component } from 'react'
import plotly from 'plotly.js'
import Plot from 'react-plotly.js'

export default class Chart1 extends Component {
	constructor() {
		super()
		this.state = {
			total: [],
			options: {},
			x: [],
			y: [],
			y1: [],
			dataArr: []
		}
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
		try {
			let data = await this.getData()
			data = data.split('\n')

			for (let i = 1; i < 31; i++) {
				const e = data[i].split(',')
				// this.state.total.push({
				// 	x: parseInt(e[0], 10),
				// 	y: parseInt(e[1], 10)
				// })
				this.state.x.push(parseInt(e[0], 10))
				this.state.y.push(parseInt(e[1], 10))
			}
			this.setState({
				dataArr: [
					{
						x: this.state.x,
						y: this.state.y,
						type: 'scatter',
						mode: 'lines+markers',

						layout: {
							plot_bgcolor: '#000'
						},
						line: {
							color: 'rgb(219, 64, 82)',
							width: 3
						}
					}
				]
			})
			plotly.plot('myDiv', [
				{
					x: this.state.x,
					y: this.state.y,
					type: 'scatter',
					mode: 'lines+markers',

					layout: {
						plot_bgcolor: 'black',
						paper_bgcolor:"#FFF3"
					},
					line: {
						color: 'rgb(219, 64, 82)',
						width: 3
					}
				}
			],{})
			// console.log(this.state.total[0])
		} catch (err) {
			console.log('API Down')
		}
	}

	render() {
		return (
			<div
			// id="myDiv"
			>
				<Plot data={this.state.dataArr}/>
			</div>
		)
	}
}
