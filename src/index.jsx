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

import './styles/styles.css';

import App from './app';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);
