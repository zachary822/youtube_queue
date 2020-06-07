import {ADD_URL, ADD_URL_POSITION, MOVE_URL, REMOVE_URL} from '../types';

export default function (state = [], action) {
  switch (action.type) {
  case ADD_URL:
    return [...state, action.url];
  case ADD_URL_POSITION:
    return [...state.slice(0, action.position), action.url, ...state.slice(action.position)];
  case REMOVE_URL:
    return [...state.slice(0, action.position), ...state.slice(action.position + 1)];
  case MOVE_URL:
    if (action.source >= action.target) {
      return [
        ...state.slice(0, action.target),
        state[action.source],
        ...state.slice(action.target, action.source),
        ...state.slice(action.source + 1)
      ];
    }
    return [
      ...state.slice(0, action.source),
      ...state.slice(action.source + 1, action.target + 1),
      state[action.source],
      ...state.slice(action.target + 1)
    ];
  }
  return state;
}
