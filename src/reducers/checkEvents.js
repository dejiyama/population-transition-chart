import { CHECKED_EVENTS, UNCHECKED_EVENTS } from '../actions';
const initialState = []
export default (checkevents = initialState, action) => {
	switch (action.type) {
		case CHECKED_EVENTS:
			const data = action.res_series
			checkevents.push(data)
			return [ ...checkevents ]
		case UNCHECKED_EVENTS:
			let targetName = checkevents.find (item => item.name === action.targetPrefName)
			const result = checkevents.filter(function( item ) {
				return item !== targetName
			})
			return result;
		default:
			return checkevents;
	}
};