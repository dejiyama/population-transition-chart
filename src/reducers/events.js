import _ from 'lodash'
import { READ_EVENTS } from '../actions';

export default (events = {}, action) => {
	switch (action.type) {
		case READ_EVENTS:
			console.log(_.mapKeys(action.responese.data.result, 'prefCode'));
			return _.mapKeys(action.responese.data.result, 'prefCode')
		default:
			return events;
	}
};