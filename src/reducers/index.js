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

    case "CLEAR_INFOCUS_EFFECT":
      return {
        ...state,
        focusedEffect: action.payload
      }

    case "ADD_DELAY":
      return {...state,
        focusedEffect: "Delay",
        effects: {
          ...state.effects,
          Delay: {
            ...state.effects.Delay,
            on: true,
            active: true}}};

    case "ALTER_DELAY":
      return {...state,
        effects: {...state.effects,
        Delay: {...state.effects.Delay, settings:
        action.payload}}};

    case "SWITCH_DELAY":
      return {...state,
        effects: {
          ...state.effects,
          Delay: {
            ...state.effects.Delay,
            on: action.payload,
            }}};

    case "ADD_REVERB":
      return {...state,
        focusedEffect: "Reverb",
        effects: {
          ...state.effects,
          Reverb: {
            ...state.effects.Reverb,
            on: true,
            active: true}}};

    case "ALTER_REVERB":
      return {...state,
        effects: {...state.effects,
        Reverb: {...state.effects.Reverb, settings:
        action.payload}}};

    case "SWITCH_REVERB":
      return {...state,
        effects: {
          ...state.effects,
          Reverb: {
            ...state.effects.Reverb,
            on: action.payload,
            }}};

    case "ADD_DISTORTION":
      return {...state,
        focusedEffect: "Distortion",
        effects: {
          ...state.effects,
          Distortion: {
            ...state.effects.Distortion,
            on: true,
            active: true}}};

    case "ALTER_DISTORTION":
      return {...state,
        effects: {...state.effects,
        Distortion: {...state.effects.Distortion, settings:
        action.payload}}};

    case "SWITCH_DISTORTION":
      return {...state,
        effects: {
          ...state.effects,
          Distortion: {
            ...state.effects.Distortion,
            on: action.payload,
            }}};

    case "ADD_FLANGER":
      return {...state,
        focusedEffect: "Flanger",
        effects: {
          ...state.effects,
          Flanger: {
            ...state.effects.Flanger,
            on: true,
            active: true}}};

    case "ALTER_FLANGER":
      return {...state,
        effects: {...state.effects,
        Flanger: {...state.effects.Flanger, settings:
        action.payload}}};

    case "SWITCH_FLANGER":
      return {...state,
        effects: {
          ...state.effects,
          Flanger: {
            ...state.effects.Flanger,
            on: action.payload,
            }}};

    case "ADD_TREMOLO":
      return {...state,
        focusedEffect: "Tremolo",
        effects: {
          ...state.effects,
          Tremolo: {
            ...state.effects.Tremolo,
            on: true,
            active: true}}};

    case "ALTER_TREMOLO":
      return {...state,
        effects: {...state.effects,
        Tremolo: {...state.effects.Tremolo, settings:
        action.payload}}};

    case "SWITCH_TREMOLO":
      return {...state,
        effects: {
          ...state.effects,
          Tremolo: {
            ...state.effects.Tremolo,
            on: action.payload,
            }}};

    case "ADD_FUZZ":
      return {...state,
        focusedEffect: "Fuzz",
        effects: {
          ...state.effects,
          Fuzz: {
            ...state.effects.Fuzz,
            on: true,
            active: true}}};

    case "ALTER_FUZZ":
      return {...state,
        effects: {...state.effects,
        Fuzz: {...state.effects.Fuzz, settings:
        action.payload}}};

    case "SWITCH_FUZZ":
      return {...state,
        effects: {
          ...state.effects,
          Fuzz: {
            ...state.effects.Fuzz,
            on: action.payload,
            }}};

    case "ADD_LOWPASS":
      return {...state,
        focusedEffect: "LowPass",
        effects: {
          ...state.effects,
          LowPass: {
            ...state.effects.LowPass,
            on: true,
            active: true}}};

    case "ALTER_LOWPASS":
      return {...state,
        effects: {...state.effects,
        LowPass: {...state.effects.LowPass, settings:
        action.payload}}};

    case "SWITCH_LOWPASS":
      return {...state,
        effects: {
          ...state.effects,
          LowPass: {
            ...state.effects.LowPass,
            on: action.payload,
            }}};

    case "ADD_HIGHPASS":
      return {...state,
        focusedEffect: "HighPass",
        effects: {
          ...state.effects,
          HighPass: {
            ...state.effects.HighPass,
            on: true,
            active: true}}};

    case "ALTER_HIGHPASS":
      return {...state,
        effects: {...state.effects,
        HighPass: {...state.effects.HighPass, settings:
        action.payload}}};

    case "SWITCH_HIGHPASS":
      return {...state,
        effects: {
          ...state.effects,
          HighPass: {
            ...state.effects.HighPass,
            on: action.payload,
            }}};
    default:
      return {...state}
  }
}

export default reducer;
