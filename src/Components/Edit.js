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
import InFocusEffect from '../Containers/InFocusEffect';
import EffectsGrid from './EffectsGrid';
import SpeedDialer from './SpeedDialer';
import Recorder from 'recorder-js';
import FileSaver from 'file-saver'




class Edit extends Component {
  constructor(props){
    super(props)

    this.state = {
      displayGrid: true,
      displayEffect: false,
    }
  }


  componentDidMount = () => {
    if (this.props.mainReducer.focusedEffect === "") {
      this.setState({
        displayGrid: false
      })
    } else
    {this.setState({
      displayGrid: true
    })}
  }



  play = () => {
    // console.log(this.props.mainReducer.effects.Delay.settings)
    var sounds = this.props.mainReducer.currentRecording
    //

      let newEffect = new Pizzicato.Effects.Delay()

    for (var effect in this.props.mainReducer.effects) {
        console.log("EFFECT IS ONE", );
      if (this.props.mainReducer.effects[effect].on) {
        let effectProps = this.props.mainReducer.effects[effect]
        let newEffect = new Pizzicato.Effects[effectProps.pizzicatoName](
          effectProps.settings
        );
        sounds.addEffect(newEffect)
        else if (!this.props.mainReducer.effects[effect].on) {
        sounds.removeEffect(newEffect)
      }
    }
    sounds.play()
  }
  pause = () => {
    this.props.mainReducer.currentRecording.pause()
    // recorder.stop()
    // recorder.stop()
    // console.log(recorder);
  }

  stop = () => {
    this.props.mainReducer.currentRecording.stop()

  }

saveSource = () => {

  // console.log(this.props.mainReducer.currentRecording);
  // let toSave = this.props.mainReducer.currentRecording.masterGainNaode
  // var file = new File([toSave], "helloWorld.opus", {type:'audio/webm;codecs=opus'});
  //
  // console.log("file", file);
  // FileSaver.saveAs(file)
  //


  // console.log(recorder);
  // recorder && recorder.record();
  // recorder.exportWAV(() => console.log('it worked?'))
}


addEffects = () => {
  ;

  // this.props.mainReducer.currentRecording.addEffect(delay);
}

  render() {
    console.log("State,", this.state);
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
        <Paper className='Main-Paper Edit' id='main-audio-object' elevation={1}>

          <div>
          {/* Add a visualizer here */}
          </div>

          <Button
            className='Player'
            id='recordedAudioPlayer'
            onClick={this.play}
            variant="fab"
            color="primary"
            aria-label="add" mini>
             <PlayArrow />
           </Button>
           <Button
             className='Player'
             id='recordedAudioPlayer'
             onClick={this.pause}
             variant="fab"
             color="primary"
             aria-label="add" mini>
              <Pause />
            </Button>
            <Button
              className='Player'
              id='recordedAudioPlayer'
              onClick={this.stop}
              variant="fab"
              color="primary"
              aria-label="add" mini>
               <Stop />
             </Button>
             <Button
               className='Player'
               id='recordedAudioPlayer'
               onClick={this.saveSource}
               variant="fab"
               color="primary"
               aria-label="add" mini>
                <Stop />
              </Button>
        </Paper>
        <br /> <br />
        {this.props.mainReducer.focusedEffect === "" ? <EffectsGrid /> : <InFocusEffect />}
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
