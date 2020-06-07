/**
 * @author zacharyjuang
 */
import {v4 as uuidv4} from 'uuid';
import _ from 'lodash';
import {
  ADD_HISTORY,
  ADD_URL,
  ADD_URL_POSITION,
  CLEAR_HISTORY,
  MOVE_URL,
  REMOVE_HISTORY,
  REMOVE_URL,
  SET_REPLAY,
  TOGGLE_REPLAY
} from './types';

function addHash(url, hash) {
  let u = new URL(url);
  if (_.isUndefined(hash) || typeof hash !== 'string') {
    u.hash = uuidv4();
  } else {
    u.hash = hash;
  }
  return u.toString();
}

export function addURL(url) {
  let u = addHash(url);

  return {
    type: ADD_URL,
    url: u
  };
}

export function addURLPosition(url, position) {
  let u = addHash(url);
  return {
    type: ADD_URL_POSITION,
    url: u,
    position
  };
}

export function removeURL(position) {
  return {
    type: REMOVE_URL,
    position
  };
}

export function moveURL(source, target) {
  return {
    type: MOVE_URL,
    source,
    target
  };
}

export function addHistory(url) {
  let u = addHash(url, '');

  return {
    type: ADD_HISTORY,
    url: u
  };
}

export function clearHistory() {
  return {
    type: CLEAR_HISTORY
  };
}

export function removeHistory(position) {
  return {
    type: REMOVE_HISTORY,
    position
  };
}

export function setReplay(replay) {
  return {
    type: SET_REPLAY,
    replay
  };
}

export function toggleReplay() {
  return {
    type: TOGGLE_REPLAY
  };
}
