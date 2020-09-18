import axios from 'axios'
import apiKey from '../apiKey'

export const READ_EVENTS = 'READ_EVENTS'

const ROOT_URL = 'https://opendata.resas-portal.go.jp/api/v1'

export const readEvents = () => async dispatch => {
	const responese = await axios.get(`${ROOT_URL}/prefectures`,{headers: { 'X-API-KEY': apiKey }})
	dispatch({type: 'READ_EVENTS', responese})
};
