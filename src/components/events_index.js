import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash'

import { readEvents } from '../actions/index.js'

class EventsIndex extends Component {
	componentDidMount() {
		this.props.readEvents()
	}

	renderEvents() {
		return _.map(this.props.events, event => (
			<div key={event.prefCode}>{event.prefName}</div>
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
