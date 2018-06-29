import {initialState} from '../index.js'

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_RECORDING":
    console.log(action.payload);
    return {...state,
      isRecorded: true,
      currentRecording: action.payload};
    case "ADD_EFFECT":
      return {...state};
    case "GET_RECORDINGS":
      console.log("action,", action);
      return {...state, recording: action.payload};
    case "AUTH_USER":
      return {...state, authorizedUser: true};
    case "CLEAR_RECORDING":
      return {...state,
      currentRecording: undefined,
      isRecorded: false,
      isSaved: false, };
    case "SATISFIED_WITH_RECORDING":
    return {...state,
      isRecorded: true,
      isSaved: true, };
    default:
      return {...state};
  }
}

export default reducer;
