import {
  ADD_HISTORY,
  CLEAR_HISTORY
} from '../types';

export default function (state = [], action) {
  switch (action.type) {
  case ADD_HISTORY:
    return [...state, {time: Date.now(), url: action.url}];
  case CLEAR_HISTORY:
    return [];
  default:
    return state;
  }
}
