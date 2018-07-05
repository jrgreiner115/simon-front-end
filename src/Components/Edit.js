import React, {Component} from 'react';
import Pizzicato from 'pizzicato';
import {Paper, Button, Typography} from '@material-ui/core/';
import Slider from '@material-ui/lab/Slider';
import {connect} from 'react-redux';
import {Stop, PlayArrow, Pause} from '@material-ui/icons/';
import { withRouter } from 'react-router-dom';
import InFocusEffect from '../Containers/InFocusEffect';
import EffectsGrid from './EffectsGrid';
import SpeedDialer from './AddEffectsMenu';


var sounds = undefined



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
    // this.loadEffects()
  }

  loadEffects = () => {
    sounds = this.props.mainReducer.currentRecording

    for (let effect in this.props.mainReducer.effects) {
        console.log("EFFECT IS ONE", );
      if (this.props.mainReducer.effects[effect].on) {
        let effectProps = this.props.mainReducer.effects[effect]
        let newEffect = new Pizzicato.Effects[effectProps.pizzicatoName](
          effectProps.settings
        );
        sounds.addEffect(newEffect)
      }
    }
  }


  play = () => {
    this.loadEffects()
    // console.log(this.props.mainReducer.effects.Delay.settings)
    // var sounds = this.props.mainReducer.currentRecording
    // //
    //
    //   let newEffect = new Pizzicato.Effects.Delay()
    //
    // for (var effect in this.props.mainReducer.effects) {
    //     console.log("EFFECT IS ONE", );
    //   if (this.props.mainReducer.effects[effect].on) {
    //     let effectProps = this.props.mainReducer.effects[effect]
    //     let newEffect = new Pizzicato.Effects[effectProps.pizzicatoName](
    //       effectProps.settings
    //     );
    //     sounds.addEffect(newEffect)
    //     else if (!this.props.mainReducer.effects[effect].on) {
    //     sounds.removeEffect(newEffect)
    //   }
    // }
    this.props.mainReducer.currentRecording.play()
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

handleVolume = (event, value) => {
  this.props.sendVolumeChange(value)
}

  render() {
    return (
      <div>
        <div className="Edit-Suite">
          <Paper className='Main-Paper Edit' id='main-audio-object' elevation={1}>
          <div>
          {/* Add a visualizer here */}
          </div>
          <div>
          <Button
            className='Player'
            id='recordedAudioPlayer'
            onClick={this.play}
            variant="fab"
            color="primary"
            aria-label="add" mini>
             <PlayArrow id='recordedAudioPlayerIcon'/>
           </Button>
           <Button
             className='Player'
             id='recordedAudioPlayer'
             onClick={this.pause}
             variant="fab"
             color="primary"
             aria-label="add" mini>
              <Pause id='recordedAudioPlayerIcon'/>
            </Button>
            <Button
              className='Player'
              id='recordedAudioPlayer'
              onClick={this.stop}
              variant="fab"
              color="primary"
              aria-label="add" mini>
               <Stop id='recordedAudioPlayerIcon'/>
             </Button>
             <Button
               className='Player'
               id='recordedAudioPlayer'
               onClick={this.saveSource}
               variant="fab"
               color="primary"
               aria-label="add" mini>
                <Stop id='recordedAudioPlayerIcon'/>
              </Button>
              </div>
              <span className='edit-suit-slider'>
                <Typography id="label">Volume</Typography>
                <Slider max={1} min={0} aria-labelledby="label" value={this.props.mainReducer.volume} onChange={(event, value) => this.handleVolume(event, value)}/>
              </span>
        </Paper>
      </div>
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
    sendVolumeChange: (payload) => {
      dispatch({
        type: "CHANGE_VOLUME",
        payload
      })
    },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit));
