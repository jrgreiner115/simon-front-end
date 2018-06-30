import {initialState} from '../index.js'

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_RECORDING":
    return {...state,
      isRecorded: true,
      currentRecording: action.payload};
    console.log('we did it!', state);
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
    case "ALTER_DELAY":
      return {...state,
        effects: {...state.effects,
        Delay: {...state.effects.Delay, settings:
        action.payload}}}
    case "ADD_EFFECT":
      console.log("ADD EFFECT", state.effects[action.payload]);
      var effectName = action.payload
      return {
      ...state,
      effects: state.effects,
      [effectName]: {...state.effects[effectName],
      active: true}
    };
    case "ADD_DELAY":
      return {...state,
        effects: {
          ...state.effects,
          Delay: {
            ...state.effects.Delay,
            on: true,
            active: true}}};
    case "SWITCH_DELAY":
    console.log("SWITCH", action.payload);
    return {...state,
      effects: {
        ...state.effects,
        Delay: {
          ...state.effects.Delay,
          on: action.payload,
          }}};
    default:
      return {...state}
  }
}

export default reducer;
