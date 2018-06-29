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
import reducer from './reducers/index.js';
import { syncHistoryWithStore, routerReducer, ConnectedRouter } from 'react-router-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import { createBrowserHistory } from 'history'

export const initialState = {
  authorizedUser: false,
  currentRecording: undefined,
  isRecorded: false,
  hasEffects: false,
  isSaved: false,
  isDownloaded: false,
  effects: [
    {effectName: '',
     inFocus: false,
     activated: false,
     parameters: [
     ]
    }
  ]
}

const masterReducer = combineReducers({
  routing: routerReducer,
  mainReducer: reducer
})

const store = createStore(masterReducer, { ...initialState }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const browserHistory = createBrowserHistory()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
