import { combineReducers } from 'redux'
import events from './events'
import checkevents from './checkEvents'

export default combineReducers({ events, checkevents })