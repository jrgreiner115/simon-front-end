import React, {Component} from 'react';
import Pizzicato from 'pizzicato';
import {Paper, Button, Zoom} from '@material-ui/core/';
import Slider from '@material-ui/lab/Slider';
import {connect} from 'react-redux';
import {Stop, PlayArrow, Pause, VolumeUp} from '@material-ui/icons/';
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
    let userId = localStorage.getItem("id")
    Adapter.getRecs(userId).then(json => this.props.getRecs(json.recordings))

    if (this.props.mainReducer.focusedEffect === "") {
      this.setState({displayGrid: false})
    } else {
      this.setState({displayGrid: true})
    }

    if (!!localStorage.getItem("rec_path")) {
      let id = localStorage.getItem("rec_path")
      let newsound = new Pizzicato.Sound({
        source: 'file',
        options: { path: `${process.env.REACT_APP_AWS_URL}${id}`}
      }, () => {
        this.props.satisfiedWithRecording(newsound);
        this.createVisualization();
        this.loadEffects()
    })}else {
      this.props.history.push("/record")
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

  }

  play = () => {
    this.setState({
      playing: true
    })

    sound.play()


    sound = this.props.mainReducer.currentRecording
    sound.volume = this.props.mainReducer.volume

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




    sound.on('end', () => {
      this.setState({
        playing:false
      })
    })
    console.log(sound);
  }
  pause = () => {
    this.props.mainReducer.currentRecording.pause()
  }

  stop = () => {
    this.props.mainReducer.currentRecording.stop()

  }


  saveSource = () => {

  }

  handleVolume = (event, value) => {
    this.props.sendVolumeChange(value)
  }

  createVisualization(){
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
        <Paper style={{
          borderRadius: '40px',
        }} className='Main-Paper Edit' id='main-audio-object' elevation={1}>
          <Zoom in={this.state.playing}>
            <div className='dancing-edit-guy-div'>
              <img src={DancingGuy} alt='dancing-Simon-character' className='dancing-edit-guy' />
            </div>
          </Zoom>
          <div>
          <div className='analyzer-canvas'>
            <canvas
              ref="analyzerCanvas"
              id="analyzer"
            />
          </div>
          <div className='edit-buttons-div'>
            <Button className='Player' id='recordedAudioPlayer' onClick={this.play} variant="fab" color="primary" aria-label="add" mini>
              <PlayArrow id='recordedAudioPlayerIcon'/>
            </Button>
            <Button className='Player' id='recordedAudioPlayer' onClick={this.pause} variant="fab" color="primary" aria-label="add" mini>
              <Pause id='recordedAudioPlayerIcon'/>
            </Button>
            <Button className='Player' id='recordedAudioPlayer' onClick={this.stop} variant="fab" color="primary" aria-label="add" mini>
              <Stop id='recordedAudioPlayerIcon'/>
            </Button>
          </div>
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
        <span
          className="volume-slider-div">
          <span className='volumeIcon'><VolumeUp /></span>
          <Slider
            className="volume-slider"
            max={1}
            min={0}
            aria-labelledby="label"
            value={this.props.mainReducer.volume}
            onChange={(event, value) => this.handleVolume(event, value)}/>
          </span>

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
