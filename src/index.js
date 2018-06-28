import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';
import { createStore } from "redux";
import { combineReducers } from 'redux';
import UUID from 'uuid';
import {Provider} from 'react-redux';
import reducer from './reducers/index.js'

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
