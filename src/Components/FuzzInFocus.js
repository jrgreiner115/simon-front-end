import React, {Component} from 'react';
import {Paper, Typography, Fade, Switch, ClickAwayListener, Button, IconButton} from '@material-ui/core/';
import Slider from '@material-ui/lab/Slider';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuzzImage from './Character/fuzz.png';
import CloseIcon from '@material-ui/icons/Close';

class FuzzInFocus extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lowGain: this.props.mainReducer.effects.Fuzz.settings.lowGain,
      midLowGain: this.props.mainReducer.effects.Fuzz.settings.midLowGain,
      midHighGain: this.props.mainReducer.effects.Fuzz.settings.midHighGain,
      highGain: this.props.mainReducer.effects.Fuzz.settings.highGain,
    }
  }

  handleChange = (event, value, name) => {
    this.setState({
      [name]: value
    }, this.props.sendFuzzChange(this.state))
  }

  handleSwitch = name => event => {
      this.props.switchFuzz(event.target.checked)
    };
  handleClickAway = (event) => {
    if (event.target.id === 'recordedAudioPlayer'|| event.target.id === 'main-audio-object' || event.target.id === 'recordedAudioPlayerIcon' || event.target.id === 'effect-container' || event.target.id === 'Menu-actions' || event.target=== 'svg'||
    event.path[2].id === 'recordedAudioPlayerIcon') {
      return null
    }else {
      this.props.clearInFocusEffect("")
    }
  }

  handleRemoveButton = (name) => {
    this.props.removeEffect(name)
    this.props.clearInFocusEffect("")
  }

  handleEffectClose = () => {
    this.props.clearInFocusEffect("")
  }

  render() {
    return (
      <div id='effect-container'>
        <ClickAwayListener onClickAway={this.handleClickAway}>
        <Fade in>
          <Paper
            className='Effect-Paper'
            style={{
              borderRadius: '40px',
            }} >
          <div className="effect-close">
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleEffectClose}
            >
              <CloseIcon
                style={{color: 'rgba(0, 0, 0, 0.54'}}/>
            </IconButton>
          </div>
          <div className='left-side-effect-card'>
            <div className='Effect-Details'>
            <Typography variant="headline">
              Fuzz
            </Typography>
            <div class="effect-options">
              <Switch
                style={{marginRight: '10px'}}
                color='primary'
                checked={this.props.mainReducer.effects.Fuzz.on}
                onChange={this.handleSwitch("ON")}
              />
              <Button
                style={{marginRight: '10px'}}
                variant="extendedFab" color="primary" onClick={this.handleEffectClose}>
                Save
              </Button>
              <Button
                style={{marginRight: '10px'}}
                variant="extendedFab" color="primary" onClick={(name) => this.handleRemoveButton('Fuzz')}>
                Remove
              </Button>
            </div>
          </div>
          <div className='effects-character'>
            <img alt='Character with fuzzy sweater (get it>)' src={FuzzImage} className="RevHall" width='150px' />
          </div>
        </div>
        <span className='right-side-effect-card'>
              <Typography variant='body2'>Fuzz is a lot like distortion! Made Famous by Jimi Hendrix, it's basically the first attempt at creating a guitar effect! This fuzz effect let's you control which part of the audio is getting the distortion - the Low Gain affects the deepest part of the recording (Bass), and the High Gain affects the highest notes (Treble).</Typography>
              <br />
              <Typography id="label">Mix</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.Fuzz.on}
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Fuzz.settings.mix}
                onChange={(event, value, name) => this.handleChange(event, value, "mix")}
              />
              <Typography id="label">Low Gain</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.Fuzz.on}
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Fuzz.settings.lowGain}
                onChange={(event, value, name) => this.handleChange(event, value, "lowGain")}
              />
              <Typography id="label">Mid Low Gain</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.Fuzz.on}
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Fuzz.settings.midLowGain}
                onChange={(event, value, name) => this.handleChange(event, value, "midLowGain")}
              />
              <Typography id="label">Mid High Gain</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.Fuzz.on}
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Fuzz.settings.midHighGain}
                onChange={(event, value, name) => this.handleChange(event, value, "midHighGain")}
              />
              <Typography id="label">High</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.Fuzz.on}
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Fuzz.settings.highGain}
                onChange={(event, value, name) => this.handleChange(event, value, "highGain")}
              />
          </span>
        </Paper>
        </Fade>
        </ClickAwayListener>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendFuzzChange: (payload) => {
      dispatch({
        type: "ALTER_FUZZ",
        payload: payload
      })
    },
    switchFuzz: (payload) => {
      dispatch({
        type: "SWITCH_FUZZ",
        payload
      })
    },
    clearInFocusEffect: (payload) => {
      dispatch({
        type: "CLEAR_INFOCUS_EFFECT",
        payload: payload
      })
    },
    removeEffect: (name) => {
      dispatch({
        type: "REMOVE_EFFECT",
        payload: name
      })
    },
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FuzzInFocus));
