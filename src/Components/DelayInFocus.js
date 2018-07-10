import React, {Component} from 'react';
import {Paper, Typography, Fade, Switch, ClickAwayListener, Button, IconButton} from '@material-ui/core/';
import Slider from '@material-ui/lab/Slider';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import Delay from './Character/delay.png';

class DelayInFocus extends Component {
constructor(props) {
  super(props)

  this.state = {
      mix: this.props.mainReducer.effects.Delay.settings.mix,
      feedback: this.props.mainReducer.effects.Delay.settings.feedback,
      time: this.props.mainReducer.effects.Delay.settings.time
  }
}


  handleChange = (event, value, name) => {
    this.setState({
      [name]: value
    }, this.props.sendDelayChange(this.state))
  }

  handleSwitch = name => event => {
      this.props.switchDelay(event.target.checked)
    };

  handleClickAway = (event) => {
    console.log(event);
    if (event.target.id === 'recordedAudioPlayer'|| event.target.id === 'main-audio-object' || event.target.id === 'recordedAudioPlayerIcon' || event.target.id === 'effect-container' || event.target.id === 'Menu-actions' || event.target=== 'svg'||
    event.path[2].id === 'recordedAudioPlayerIcon') {
      null
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
      <div
        className="Effect-Paper-Div"
        id='effect-container'>
        <ClickAwayListener onClickAway={this.handleClickAway}>
        <Fade in>
        <Paper className='Effect-Paper'>
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
                Delay
              </Typography>
              <Switch
                checked={this.props.mainReducer.effects.Delay.on}
                onChange={this.handleSwitch("ON")}
              />
            </div>
            <div className='ReverbChar'>
              <img src={Delay} className="RevHall" width='150px' />
            </div>
            <Button size="small" color="primary" onClick={(name) => this.handleRemoveButton('Delay')}>
              Remove Effect
            </Button>
            </div>
            <span className='right-side-effect-card'>
              <Typography variant='body2'>Delay is also called a repeat, or an echo! It's like a copy of the sound, kind of like making copies with a printer. A delay effect like this one will repeat the audio image over and over, at a rate that you set! Try setting the Mix to 100% – you'll hear only the repeats!</Typography>
              <br />
              <Typography id="label">Mix</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.Delay.on}
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Delay.settings.mix}
                onChange={(event, value, name) => this.handleChange(event, value, "mix")}
              />
              <Typography id="label">Feedback</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.Delay.on}
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Delay.settings.feedback}
                onChange={(event, value, name) => this.handleChange(event, value, "feedback")}
              />
              <Typography id="label">Time</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.Delay.on}
                max={5}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Delay.settings.time}
                onChange={(event, value, name) => this.handleChange(event, value, "time")}
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
    addRecording: (recording) => {
      dispatch({
        type: "ADD_RECORDING",
        payload: recording
      })
    },
    sendDelayChange: (payload) => {
      dispatch({
        type: "ALTER_DELAY",
        payload: payload
      })
    },
    switchDelay: (payload) => {
      dispatch({
        type: "SWITCH_DELAY",
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DelayInFocus));
