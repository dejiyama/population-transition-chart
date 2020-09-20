import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


import { readEvents } from '../actions/index.js';
import apiKey from '../apiKey'

class EventsIndex extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selected: false,
			series: []
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}	

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		if (value) {
			fetch(
				`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${target.name}`,
				{
					headers: { 'X-API-KEY': apiKey }
				}
			)
			.then(response => response.json())
			.then(res => {
				let tmp = [];
				res.result.data.find(re => re.label === "総人口").data.forEach(i => {tmp.push(i.value)});
				const res_series = {
					name: target.name,
					data: tmp
				};
				this.setState({
					series: [...this.state.series, res_series]
				})
				console.log(this.state.series);
			})
		  } else {
			  let targetName = this.state.series.find( item => item.name === target.name)
			  this.setState({
				  series: this.state.series.filter(n => n !== targetName)
			  })
		  }
		}

	componentDidMount() {
		this.props.readEvents()
	}

	renderEvents() {
		return _.map(this.props.events, event => (
			<div key={event.prefCode} style={{ margin: '5px', display: 'inline-block' }}>
				{event.prefName}
				<input
				name={event.prefCode}
				type="checkbox"
				checked={this.state.isGoing}
				onChange={this.handleInputChange}/>
			</div>
		))
	}
	render() {
		const options = {
			title: {
				text: '都道府県別の総人口推移グラフ'
			},
			plotOptions: {
				series: {
					label: {
						connectorAllowed: false
					},
					pointInterval: 5,
					pointStart: 1965
				}
			},
			series: this.state.series
		}
		return (
			<React.Fragment>
				{ this.renderEvents() }
				<HighchartsReact highcharts={Highcharts} options={options} />
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({ events: state.events})

const mapDispatchToProps = ({ readEvents })

export default connect(mapStateToProps,mapDispatchToProps)(EventsIndex);
