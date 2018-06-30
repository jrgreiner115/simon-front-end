import React, {Component} from 'react';
import Pizzicato from 'pizzicato';
import {ReactMic} from 'react-mic';
import {Paper, Typography, TextField, Button, Icon, Fade, Slide} from '@material-ui/core/';
import {connect} from 'react-redux';
import {FiberManualRecord, Stop, PlayArrow, Pause, Save, Delete, Add } from '@material-ui/icons/';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Menu, MainButton, ChildButton } from 'react-mfb';
import 'react-mfb/mfb.css';
import DelayInFocus from './DelayInFocus';
import ReverbInFocus from './ReverbInFocus';
import DistortionInFocus from './DistortionInFocus';
import FlangerInFocus from './FlangerInFocus';
import TremoloInFocus from './TremoloInFocus';
import FuzzInFocus from './FuzzInFocus';
import EffectsGrid from './EffectsGrid'
import SpeedDialer from './SpeedDialer'


class Edit extends Component {
  constructor(props){
    super(props)

  }


componentDidMount = () => {
}



play = () => {
  // this.props.mainReducer.currentRecording.play()
}
pause = () => {
  // this.props.mainReducer.currentRecording.pause()
}

stop = () => {
  // this.props.mainReducer.currentRecording.stop()
}

addDelay = () => {
  console.log("CLICKED!");
}

  render() {
    var panel = document.getElementById('panel'),
    showcode = document.getElementById('showcode'),
    selectFx = document.getElementById('selections-fx'),
    selectPos = document.getElementById('selections-pos'),
    selectMethod = document.getElementById('selections-method');
    var effect = 'zoomin',
    pos = 'br',
    method = 'hover';
    return (
      <div>
        <Paper className='Main-Paper Edit' elevation={1}>

          <div>
          {/* Add a visualizer here */}
          </div>

          <Button
            className='Play'
            onClick={this.play}
            variant="fab"
            color="primary"
            aria-label="add" mini>
             <PlayArrow />
           </Button>
           <Button
             className='Play'
             onClick={this.pause}
             variant="fab"
             color="primary"
             aria-label="add" mini>
              <Pause />
            </Button>
            <Button
              className='Play'
              onClick={this.stop}
              variant="fab"
              color="primary"
              aria-label="add" mini>
               <Stop />
             </Button>
        </Paper>
        <br /> <br />
        <EffectsGrid />

        <DelayInFocus />
        <ReverbInFocus />
        <DistortionInFocus />
        <FlangerInFocus />
        <TremoloInFocus />
        <FuzzInFocus />
        <SpeedDialer />
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    addRecording: (recording) => {
      dispatch({
        type: "ADD_RECORDING",
        payload: recording
      })
    },
    clearRecording: (recording) => {
      console.log('is it deleting immediately?');
      dispatch({
        type: "CLEAR_RECORDING",
        payload: recording
      })
    },
    satisfiedWithRecording: (recording) => {
      dispatch({
        type: "SATISFIED_WITH_RECORDING",
        payload: recording
      })
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit));
