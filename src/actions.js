/**
 * @author zacharyjuang
 */
import {
  ADD_URL,
  REMOVE_URL,
  MOVE_URL,
  ADD_HISTORY,
  CLEAR_HISTORY
} from './types';

export function addURL(url) {
  return {
    type: ADD_URL,
    url
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
  return {
    type: ADD_HISTORY,
    url
  }
}

export function clearHistory() {
  return {
    type: CLEAR_HISTORY
  }
}
