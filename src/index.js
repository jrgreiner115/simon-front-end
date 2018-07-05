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
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import theme from './theme.js';


export const initialState = {
  authorizedUser: false,
  currentRecording: undefined,
  isRecorded: false,
  hasEffects: false,
  isSaved: false,
  volume: 0.8,
  isDownloaded: false,
  focusedEffect: "",
  effects: {
    Flanger: {
      name: "Flanger",
      pizzicatoName: "Flanger",
      on: false,
      active: false,
      settings: {
      time: 0.45,
      speed: 0.2,
      depth: 0.1,
      feedback: 0.1,
      mix: 0.5
  }},
    Delay: {
      name: "Delay",
      pizzicatoName: "Delay",
      on: false,
      active: false,
      settings: {
      time: 0.3,
      feedback: 0.4,
      mix: 0.2
  }},
    Distortion: {
      name: 'Distortion',
      pizzicatoName: "Distortion",
      on: false,
      active: false,
      settings: {
      gain: 0.4
    }},
    Fuzz: {
      name: 'Fuzz',
      pizzicatoName: "Quadrafuzz",
      on: false,
      active: false,
      settings: {
      lowGain: 0.6,
      midLowGain: 0.8,
      midHighGain: 0.5,
      highGain: 0.6,
      mix: 1.0
    }},

    Reverb: {
      name: 'Reverb',
      pizzicatoName: "Reverb",
      on: false,
      active: false,
      settings: {
      time: 0.1,
      decay: 0.3,
      mix: 0.3
    }},
    Tremolo: {
      name: "Tremolo",
      pizzicatoName: "Tremolo",
      on: false,
      active: false,
      settings: {
      speed: 2,
      depth: 0.6,
      mix: 0.3
    }},
    LowPass: {
      name: "LowPass",
      pizzicatoName: "LowPassFilter",
      on: false,
      active: false,
      settings: {
      frequency: 400,
      peak : 10
    }},
    HighPass: {
      name: "HighPass",
      pizzicatoName: "HighPassFilter",
      on: false,
      active: false,
      settings: {
      frequency: 400,
      peak : 10
    }}
  }
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
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
