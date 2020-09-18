import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash'

import { readEvents } from '../actions/index.js'

class EventsIndex extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selected: false,
		}
	}

	handleInputChange(event) {
		console.log(event.target,'you get')
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		console.log(value);
	}

	componentDidMount() {
		this.props.readEvents()
	}

	renderEvents() {
		return _.map(this.props.events, event => (
			<div key={event.prefCode} style={{ margin: '5px', display: 'inline-block' }}>
				{event.prefName}
				<input name={event.prefName}
				type="checkbox"
				checked={this.state.isGoing}
				onChange={this.handleInputChange}/>
			</div>
		))
	}
	render() {
		return (
			<React.Fragment>
				{ this.renderEvents() }
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({ events: state.events})

const mapDispatchToProps = ({ readEvents })

export default connect(mapStateToProps,mapDispatchToProps)(EventsIndex);
