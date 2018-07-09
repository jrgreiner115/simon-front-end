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

var sounds = undefined


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
    // debugger
    if (!!localStorage.getItem("rec_path")) {
      let newsound = new Pizzicato.Sound({
        source: 'file',
        options: { path: process.env.REACT_APP_AWS_TEST_URL }
      }, () => {
        this.props.satisfiedWithRecording(newsound);
        this.createVisualization()
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
    sounds = this.props.mainReducer.currentRecording

    for (let effect in this.props.mainReducer.effects) {

      if (this.props.mainReducer.effects[effect].on) {
        let effectProps = this.props.mainReducer.effects[effect]
        let newEffect = new Pizzicato.Effects[effectProps.pizzicatoName](effectProps.settings);
        sounds.addEffect(newEffect)
        this.props.effectAdded(effect)
      }
    }
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
    let sound = this.props.mainReducer.currentRecording
    sound.volume = this.props.mainReducer.volume
    this.loadEffects()
    sound.play()



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
    return (<div className="edit-div">
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

    </div>)
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
