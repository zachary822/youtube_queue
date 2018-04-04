/**
 * @author zacharyjuang
 */
import uuidv4 from 'uuid/v4';
import {
  ADD_URL,
  REMOVE_URL,
  MOVE_URL,
  ADD_HISTORY,
  CLEAR_HISTORY
} from './types';

export function addURL(url) {
  let u = new URL(url);
  u.hash = uuidv4();

  return {
    type: ADD_URL,
    url: u.toString()
  }
}

export function removeURL(position) {
  return {
    type: REMOVE_URL,
    position
  }
}

export function moveURL(source, target) {
  return {
    type: MOVE_URL,
    source,
    target
  }
}

export function addHistory(url) {
  let u = new URL(url);
  u.hash = '';

  return {
    type: ADD_HISTORY,
    url: u.toString()
  }
}

export function clearHistory() {
  return {
    type: CLEAR_HISTORY
  }
}
