import {combineReducers} from 'redux';
import queue from './queue';
import history from './history';
import replay from './replay';

export default combineReducers({
  queue,
  history,
  replay
});
