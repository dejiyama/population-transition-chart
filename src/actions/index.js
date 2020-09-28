import axios from 'axios'
import apiKey from '../apiKey'

export const READ_EVENTS = 'READ_EVENTS'
export const CHECKED_EVENTS = 'CHECKED_EVENTS'
export const UNCHECKED_EVENTS = 'UNCHECKED_EVENTS'

const EVENT_INDEX_URL = 'https://opendata.resas-portal.go.jp/api/v1'

export const readEvents = () => async dispatch => {
	const responese = await axios.get(`${EVENT_INDEX_URL}/prefectures`,{headers: { 'X-API-KEY': apiKey }})
	dispatch({type: 'READ_EVENTS', responese})
};

export const checkEvents = (res_series,target) => async dispatch => {
	dispatch({type: 'CHECKED_EVENTS', target, res_series,})
};

export const uncheckEvents = (targetPrefName) => async dispatch => {
	dispatch({type: 'UNCHECKED_EVENTS', targetPrefName})
};