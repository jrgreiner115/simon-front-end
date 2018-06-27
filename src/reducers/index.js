const initialState = {
  recording: {
    isRecorded: false,
    hasEffects: false,
    isDownloaded: false,
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
    case "ADD_EFFECT":
      return {...state};
    case "GET_RECORDINGS":
      console.log("action,", action);
      return {...state, recording: action.payload}
    default:
      return {...state};
  }
}

export default reducer;
