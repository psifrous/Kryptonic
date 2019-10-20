import React, { Component } from 'react'

export default class Top extends Component {

	constructor() {
		super()
		this.state = { val: 1 }
    this.handleInput=this.handleInput.bind(this)
  }

	handleInput(e) {
    this.setState({ val: e.target.value })
	}


	render() {
		return (
			<React.Fragment>
				<div className="ui light menu">
				{/*  eslint-disable-next-line */}
					<a className="active item">PANDAS</a>
				{/*  eslint-disable-next-line */}
					<a className="item">CRYPTO</a>
				{/*  eslint-disable-next-line */}
					<a className="item">STATUS</a>
				</div>

				<div className="ui divider"></div>
				<div className="ui two column padded grid">
					<div className="column">
						<h1>
							<p>Predict Crypto</p>
						</h1>
						<h3>
							<p>Enter The Number of Days </p>
						</h3>
						<div className="slidecontainer">
							<label for="myrange">
						<p id="demo">{this.state.val} Days</p>
                </label>
							<input
								onInput={this.handleInput}
								type="range"
								min="1"
								max="31"
								value={this.state.val}
								className="slider"
								id="myRange"
							/>
						</div>
						<p></p>
					</div>
				</div>
			</React.Fragment>
		)
	}
}
