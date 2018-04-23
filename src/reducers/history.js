import {
  ADD_HISTORY,
  CLEAR_HISTORY,
  REMOVE_HISTORY
} from '../types';

export default function (state = [], action) {
  switch (action.type) {
  case ADD_HISTORY:
    return [...state, {time: Date.now(), url: action.url}];
  case CLEAR_HISTORY:
    return [];
  case REMOVE_HISTORY:
    return [...state.slice(0, action.position), ...state.slice(action.position + 1)];
  }
  return state;
}
