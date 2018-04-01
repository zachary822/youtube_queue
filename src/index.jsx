/**
 * @author zacharyjuang
 * 1/18/18
 */
import 'file-loader?name=[name].[ext]!./index.html';
import './styles/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers';
import _ from 'lodash';
import {loadState, saveState} from "./localstorage";
import './fontawesome';

import './styles/styles.css';

import App from './app';

const store = createStore(
  reducers,
  loadState(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(_.debounce(function () {
  saveState(store.getState());
}, 1000, {trailing: true}));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);
