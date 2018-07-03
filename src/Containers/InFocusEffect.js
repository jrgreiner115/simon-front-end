import React, { Component } from 'react';
import {connect} from 'react-redux'
import DelayInFocus from '../Components/DelayInFocus';
import ReverbInFocus from '../Components/ReverbInFocus';
import DistortionInFocus from '../Components/DistortionInFocus';
import FlangerInFocus from '../Components/FlangerInFocus';
import TremoloInFocus from '../Components/TremoloInFocus';
import FuzzInFocus from '../Components/FuzzInFocus';
import LowPassInFocus from '../Components/LowPassInFocus';
import HighPassInFocus from '../Components/HighPassInFocus';

class InFocusEffect extends Component {


  render(){
    switch (this.props.effectInFocus){
          case "Delay":
            return (<DelayInFocus />)
          case "Flanger":
            return <FlangerInFocus />
          case "Reverb":
            return <ReverbInFocus />
          case "Distortion":
            return <DistortionInFocus />
          case "Tremolo":
              return <TremoloInFocus />
          case "Fuzz":
            return <FuzzInFocus />
          case "LowPass":
            return <LowPassInFocus />
          case "HighPass":
            return <HighPassInFocus />
          default:
            return null
        }
  }
}

const mapStateToProps = (state) => {
  return {
    effectInFocus: state.mainReducer.focusedEffect
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InFocusEffect)
