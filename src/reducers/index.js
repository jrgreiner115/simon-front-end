const initialState = {
  authorizedUser: false,
  currentRecording: undefined,
  recording: {
    isRecorded: false,
    hasEffects: false,
    isSaved: false,
    isDownloaded: false
  },
  effects: [
    {effectName: '',
     inFocus: false,
     activated: false,
     parameters: [
     ]
    }
  ]
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_RECORDING":
    console.log(action.payload);
    return {...state, recording: {
      isRecorded: true,
      hasEffects: false,
      isDownloaded: false,
    },
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
      hasEffects: false,
      isDownloaded: false, }
    default:
      return {...state};
  }
}

export default reducer;
