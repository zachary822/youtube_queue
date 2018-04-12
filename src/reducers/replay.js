/**
 * @author zacharyjuang
 */
import {SET_REPLAY, TOGGLE_REPLAY} from "../types";

export default function (state = false, action) {
  switch (action.type) {
  case SET_REPLAY:
    return action.replay;
  case TOGGLE_REPLAY:
    return !state;
  }
  return state;
}
