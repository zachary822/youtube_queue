/**
 * @author zacharyjuang
 */

export function loadState() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export function saveState(state) {
  try {
    const serilizedState = JSON.stringify(state);
    localStorage.setItem('state', serilizedState);
  } catch (e) {
    console.log(e);
  }
}
