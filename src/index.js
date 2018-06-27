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

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "ADD_EFFECT":
//       return {...state};
//     default:
//       return {...state};
//   }
// }
//
// const action1 = {
//   type: "ADD_EFFECT"
// }
// const recordingReducer = (state = [], action) => {
//   return state;
// }
// //
// // const allReducers = {
// //   effects: effectsReducer,
// //   recording: recordingReducer
// // }
//
// // const rootReducer = combineReducers(allReducers)

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
