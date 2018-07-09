import React, {Component} from 'react';
import Pizzicato from 'pizzicato';
import {Paper, Button, Typography, Zoom} from '@material-ui/core/';
import Slider from '@material-ui/lab/Slider';
import {connect} from 'react-redux';
import {Stop, PlayArrow, Pause} from '@material-ui/icons/';
import {withRouter} from 'react-router-dom';
import InFocusEffect from '../Containers/InFocusEffect';
import EffectsGrid from './EffectsGrid';
import SpeedDialer from './AddEffectsMenu';
import DancingGuy from './Character/dancing-guy.gif'
import Adapter from '../services/adapter'

var sound = undefined
let reverb
let delay
let fuzz
let tremolo
let flanger
let lowPass
let highPass
let distortion


class Edit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayGrid: true,
      displayEffect: false,
      playing: false
    }
    this.createVisualization = this.createVisualization.bind(this)
  }

  componentDidMount = () => {
    if (!!localStorage.getItem("rec_path")) {
      let newsound = new Pizzicato.Sound({
        source: 'file',
        options: { path: process.env.REACT_APP_AWS_TEST_URL }
      }, () => {
        this.props.satisfiedWithRecording(newsound);
        this.createVisualization();
        this.loadEffects()
    })}

    let userId = localStorage.getItem("id")
    fetch(`http://localhost:3500/api/v1/users/${userId}`)
      .then(resp=> resp.json()).then((json) =>{ this.props.getRecs(json.recordings)})

    if (this.props.mainReducer.focusedEffect === "") {
      this.setState({displayGrid: false})
    } else {
      this.setState({displayGrid: true})
    }

  }

  loadEffects = () => {
    sound = this.props.mainReducer.currentRecording

    reverb = new Pizzicato.Effects.Reverb(this.props.mainReducer.effects.Reverb.settings);
    delay = new Pizzicato.Effects.Delay(this.props.mainReducer.effects.Delay.settings);
    fuzz = new Pizzicato.Effects.Quadrafuzz(this.props.mainReducer.effects.Fuzz.settings);
    distortion = new Pizzicato.Effects.Distortion(this.props.mainReducer.effects.Distortion.settings);
    flanger = new Pizzicato.Effects.Flanger(this.props.mainReducer.effects.Flanger.settings);
    lowPass = new Pizzicato.Effects.LowPassFilter(this.props.mainReducer.effects.LowPass.settings);
    highPass = new Pizzicato.Effects.HighPassFilter(this.props.mainReducer.effects.HighPass.settings);
    tremolo = new Pizzicato.Effects.Tremolo(this.props.mainReducer.effects.Tremolo.settings);


    sound.addEffect(reverb)
    sound.addEffect(delay)
    sound.addEffect(fuzz)
    sound.addEffect(distortion)
    sound.addEffect(lowPass)
    sound.addEffect(highPass)
    sound.addEffect(tremolo)
    sound.addEffect(flanger)



    // if (!this.props.mainReducer.effects.Reverb.active) {
    //   reverb.mix = 0
    // }
    //
    // let effectSettings = this.props.mainReducer.effects.Reverb.settings
    // var newEffect = new Pizzicato.Effects.Reverb(effectSettings);
    // console.log(newEffect);
    // if (this.props.mainReducer.effects.Reverb.on && this.props.mainReducer.effects.Reverb.active && !this.props.mainReducer.effects.Reverb.added){
    //   console.log("IN THE IF STATEMENT");
    // sounds.addEffect(newEffect)
    // this.props.effectAdded("Reverb")}
  // }else if (!this.props.mainReducer.effects.Reverb.on) {
  //   newEffect.options(mix: 0)
  // }
  // else {
  //   console.log("HIT IT");
  //   newEffect.mix = this.props.mainReducer.effects.Reverb.settings.mix
  //   newEffect.decay = this.props.mainReducer.effects.Reverb.settings.decay
  //   newEffect.time = this.props.mainReducer.effects.Reverb.settings.time
  // }

    // for (let effect in this.props.mainReducer.effects) {
    //
    //   if (this.props.mainReducer.effects[effect].on) {
    //     let effectProps = this.props.mainReducer.effects[effect]
    //     let newEffect = new Pizzicato.Effects[effectProps.pizzicatoName](effectProps.settings);
    //     sound.addEffect(newEffect)
    //     this.props.effectAdded(effect)
    //   }
    // }
  }

  removeEffects = () => {
    console.log("SOUNDS AFTER", sound);
  }

  play = () => {
    this.setState({
      playing: true
    })

    // console.log(this.props.mainReducer.effects.Delay.settings)
    // var sounds = this.props.mainReducer.currentRecording
    //
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
    sound = this.props.mainReducer.currentRecording
    console.log("SOUNDS BEFORE", sound);
    sound.volume = this.props.mainReducer.volume

    // if (this.props.mainReducer.effects.Reverb.on && this.props.mainReducer.effects.Reverb.active) {
    //   if (!this.props.mainReducer.effects.Reverb.added) {
    //   sound.addEffect(reverb)
    //   this.props.effectAdded("Reverb")}
    //
    // }

    // Reverb
    if (!this.props.mainReducer.effects.Reverb.on) {
      reverb.mix = 0
    }else {
      reverb.mix = this.props.mainReducer.effects.Reverb.settings.mix
    }
    reverb.decay = this.props.mainReducer.effects.Reverb.settings.decay
    reverb.time = this.props.mainReducer.effects.Reverb.settings.time

    // Delay
    if (!this.props.mainReducer.effects.Delay.on) {
      delay.mix = 0
    }else {
      delay.mix = this.props.mainReducer.effects.Delay.settings.mix
    }
    delay.feedback = this.props.mainReducer.effects.Delay.settings.feedback
    delay.time = this.props.mainReducer.effects.Delay.settings.time

    // Fuzz
    if (!this.props.mainReducer.effects.Fuzz.on) {
      fuzz.lowGain = 0
      fuzz.midLowGain = 0
      fuzz.midHighGain = 0
      fuzz.highGain = 0
    }else {
      fuzz.lowGain = this.props.mainReducer.effects.Fuzz.settings.lowGain;
      fuzz.midLowGain = this.props.mainReducer.effects.Fuzz.settings.midLowGain;
      fuzz.midHighGain = this.props.mainReducer.effects.Fuzz.settings.midHighGain;
      fuzz.highGain = this.props.mainReducer.effects.Fuzz.settings.highGain;
    }

    // Distortion
    if (!this.props.mainReducer.effects.Distortion.on) {
      distortion.gain = 0
    }else {
      distortion.gain = this.props.mainReducer.effects.Distortion.settings.gain
    }

    // Flanger
    if (!this.props.mainReducer.effects.Flanger.on) {
      flanger.mix = 0
    }else {
      flanger.mix = this.props.mainReducer.effects.Flanger.settings.mix
    }
    flanger.feedback = this.props.mainReducer.effects.Flanger.settings.feedback
    flanger.time = this.props.mainReducer.effects.Flanger.settings.time
    flanger.depth = this.props.mainReducer.effects.Flanger.settings.depth
    flanger.speed = this.props.mainReducer.effects.Flanger.settings.speed

    //Tremolo
    if (!this.props.mainReducer.effects.Tremolo.on) {
      tremolo.mix = 0
    }else {
      tremolo.mix = this.props.mainReducer.effects.Tremolo.settings.mix
    }
    tremolo.depth = this.props.mainReducer.effects.Tremolo.settings.depth
    tremolo.speed = this.props.mainReducer.effects.Tremolo.settings.speed

    // LowPass
    if (!this.props.mainReducer.effects.LowPass.on) {
      lowPass.frequency = 22050
    }else {
      lowPass.mix = 0.5
    }
    lowPass.frequency = this.props.mainReducer.effects.LowPass.settings.frequency
    lowPass.peak = this.props.mainReducer.effects.LowPass.settings.peak

    // HighPass
    if (!this.props.mainReducer.effects.HighPass.on) {
      highPass.frequency = 10
    }else {
      highPass.mix = 0.5
    }
    highPass.frequency = this.props.mainReducer.effects.HighPass.settings.frequency
    highPass.peak = this.props.mainReducer.effects.HighPass.settings.peak


    sound.play()
    this.removeEffects()



    sound.on('end', () => {
      this.setState({
        playing:false
      })
    })
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

  addEffects = () => {;

    // this.props.mainReducer.currentRecording.addEffect(delay);
  }

  handleVolume = (event, value) => {
    this.props.sendVolumeChange(value)
  }

  createVisualization(){

    // var bufferLength = analyser.frequencyBinCount;
    // let frequencyData = new Uint8Array(bufferLength);
    // analyser.getByteFrequencyData(frequencyData);

        let context = Pizzicato.context
        let analyser = context.createAnalyser();
        let canvas = this.refs.analyzerCanvas;
        let ctx = canvas.getContext('2d');
        this.props.mainReducer.currentRecording.crossOrigin = 'anonymous';
        this.props.mainReducer.currentRecording.connect(analyser);
        analyser.connect(context.destination);
        this.props.mainReducer.currentRecording.connect(context.destination);

        function renderFrame() {
            let freqData = new Uint8Array(analyser.frequencyBinCount)
            requestAnimationFrame(renderFrame)
            analyser.getByteFrequencyData(freqData)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = '#a174ad';
            let bars = 100;
            for (var i = 0; i < bars; i++) {
                let bar_x = i * 3;
                let bar_width = 2;
                let bar_height = -(freqData[i] / 2);
                ctx.fillRect(bar_x, canvas.height, bar_width, bar_height)
            }
        };
        renderFrame()
    }




  render() {
    return (
      <div>
      <div className="edit-div">
      <div className="Edit-Suite">
        <Paper className='Main-Paper Edit' id='main-audio-object' elevation={1}>
          <Zoom in={this.state.playing}>
            <div className='dancing-edit-guy-div'>
              <img src={DancingGuy} className='dancing-edit-guy' />
            </div>
          </Zoom>
          <div>
            <canvas
              ref="analyzerCanvas"
              id="analyzer"
            />
          </div>
          <div>
            <Button className='Player' id='recordedAudioPlayer' onClick={this.play} variant="fab" color="primary" aria-label="add" mini>
              <PlayArrow id='recordedAudioPlayerIcon'/>
            </Button>
            <Button className='Player' id='recordedAudioPlayer' onClick={this.pause} variant="fab" color="primary" aria-label="add" mini>
              <Pause id='recordedAudioPlayerIcon'/>
            </Button>
            <Button className='Player' id='recordedAudioPlayer' onClick={this.stop} variant="fab" color="primary" aria-label="add" mini>
              <Stop id='recordedAudioPlayerIcon'/>
            </Button>
            <Button className='Player' id='recordedAudioPlayer' onClick={this.saveSource} variant="fab" color="primary" aria-label="add" mini>
              <Stop id='recordedAudioPlayerIcon'/>
            </Button>
          </div>
        </Paper>
      </div>
      {
        this.props.mainReducer.focusedEffect === ""
          ? <EffectsGrid/>
          : <InFocusEffect/>
      }
      </div>
        <div>
        <div className="volume-slider-div">
          <Slider
            className="volume-slider"
            max={1}
            min={0}
            aria-labelledby="label"
            value={this.props.mainReducer.volume}
            onChange={(event, value) => this.handleVolume(event, value)}/>
          </div>
          <SpeedDialer/>
      </div>
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
        payload})
    },
    effectAdded: (payload) => {
      dispatch({
        type: "EFFECT_ADDED",
        payload})
    },
    satisfiedWithRecording: (recording) => {
      dispatch({
        type: "SATISFIED_WITH_RECORDING",
        payload: recording
      })
    },
    getRecs: (array) => {
      dispatch({
        type: "GET_RECORDINGS",
        payload: array
      })
    },
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit));
