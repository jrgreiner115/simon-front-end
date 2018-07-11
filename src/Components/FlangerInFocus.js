import React, {Component} from 'react';
import {Paper, Typography, Fade, Switch, ClickAwayListener, Button, IconButton} from '@material-ui/core/';
import Slider from '@material-ui/lab/Slider';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import FlangerImage from './Character/Flanger.png';
import CloseIcon from '@material-ui/icons/Close';

class FlangerInFocus extends Component {
constructor(props) {
  super(props)

  this.state = {
    time: this.props.mainReducer.effects.Flanger.settings.time,
    speed: this.props.mainReducer.effects.Flanger.settings.speed,
    depth: this.props.mainReducer.effects.Flanger.settings.depth,
    feedback: this.props.mainReducer.effects.Flanger.settings.feedback,
    mix: this.props.mainReducer.effects.Flanger.settings.mix,
  }
}

componentDidMount() {

}

  handleChange = (event, value, name) => {
    this.setState({
      [name]: value
    }, this.props.sendFlangerChange(this.state))
  }

  handleSwitch = name => event => {
      this.props.switchFlanger(event.target.checked)
    };

  handleClickAway = (event) => {
    console.log(event);
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
      <div
        id='effect-container'>
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
          <div>
            <Typography variant="headline">
              Flanger
            </Typography>
            <Switch
              checked={this.props.mainReducer.effects.Flanger.on}
              onChange={this.handleSwitch("ON")}
            />
          </div>
          <div className='ReverbChar'>
            <img alt='Character with hippie sunglasses' src={FlangerImage} className="RevHall" width='150px' />
          </div>
        </div>
            <span className='right-side-effect-card'>
              <Typography variant='body2'>This effect is many under one name! A Flanger alters the sound by introducing a copy of the original. You can use this effect to chorus sounds familiar to 80's pop (Time at 60%, Speed & Depth at 30%, Feedback at 10%) or phaser sounds from the 60's psychodelic era (Time at 20%, Speed & Depth at 50%, Feedback at 40%). Or you can just get plain weird!</Typography>
              <br />
              <Typography id="label">Mix</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.Flanger.on}
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Flanger.settings.mix}
                onChange={(event, value, name) => this.handleChange(event, value, "mix")}
              />
              <Typography id="label">Time</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.Flanger.on}
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Flanger.settings.time}
                onChange={(event, value, name) => this.handleChange(event, value, "time")}
              />
              <Typography id="label">Speed</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.Flanger.on}
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Flanger.settings.speed}
                onChange={(event, value, name) => this.handleChange(event, value, "speed")}
              />
              <Typography id="label">Depth</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.Flanger.on}
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Flanger.settings.depth}
                onChange={(event, value, name) => this.handleChange(event, value, "depth")}
              />
              <Typography id="label">Feedback</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.Flanger.on}
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Flanger.settings.feedback}
                onChange={(event, value, name) => this.handleChange(event, value, "feedback")}
              />
              <br />
              <Button variant="contained" color="secondary" onClick={(name) => this.handleRemoveButton('Flanger')}>
                Remove Effect
              </Button>
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
    sendFlangerChange: (payload) => {
      dispatch({
        type: "ALTER_FLANGER",
        payload: payload
      })
    },
    switchFlanger: (payload) => {
      dispatch({
        type: "SWITCH_FLANGER",
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FlangerInFocus));
