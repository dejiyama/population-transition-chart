import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash'
import { readEvents, checkEvents, uncheckEvents } from '../actions/index.js';
import apiKey from '../apiKey'
import Chart from '../highChart.js'

class EventsIndex extends Component {
	constructor(props) {
		super(props)
		this.checkEvents = this.checkEvents.bind(this)
	}

	componentDidMount() {
		this.props.readEvents()
	}

	async checkEvents(event) {
		const target = event.target;
		if (target.checked) {
			fetch(
				`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${target.name}`,
				{
					headers: { 'X-API-KEY': apiKey }
				}
			)
				.then(response => response.json())
				.then(res => {
					let tmp = [];
					res.result.data.find(re => re.label === "総人口").data.forEach(i => tmp.push(i.value));
					let res_series = {
						name: this.props.events[target.name].prefName,
						data: tmp
					};
					this.props.checkEvents(res_series, target)
				});
		} else {
			this.props.uncheckEvents(this.props.events[target.name].prefName)
		}
	}

	renderEvents() {
		return _.map(this.props.events, event => (
			<div key={event.prefCode} style={{ margin: '5px', display: 'inline-block' }}>
				{event.prefName}
				<input
				name={event.prefCode}
				type="checkbox"
				onChange={this.checkEvents}/>
			</div>
		))
	}
	render() {
		return (
			<React.Fragment>
				{ this.renderEvents() }
				<Chart />
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({ events: state.events })

const mapDispatchToProps = ({ readEvents, checkEvents, uncheckEvents })

export default connect(mapStateToProps,mapDispatchToProps)(EventsIndex);