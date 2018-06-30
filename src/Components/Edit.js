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
import LowPassInFocus from './LowPassInFocus';
import HighPassInFocus from './HighPassInFocus';
import InFocusEffect from '../Containers/InFocusEffect'
import EffectsGrid from './EffectsGrid'
import SpeedDialer from './SpeedDialer'


class Edit extends Component {
  constructor(props){
    super(props)

    this.state = {
      displayGrid: true,
      displayEffect: false,
    }
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
        {this.state.displayGrid ? <EffectsGrid /> : <DelayInFocus />}


        <InFocusEffect />
        {/* <ReverbInFocus />
        <DistortionInFocus />
        <FlangerInFocus />
        <TremoloInFocus />
        <FuzzInFocus />
        <LowPassInFocus />
        <HighPassInFocus /> */}
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

  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit));
