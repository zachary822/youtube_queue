import {combineReducers} from 'redux';
import queue from './queue';
import history from './history';

export default combineReducers({
  queue,
  history
});
