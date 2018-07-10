import React, {Component} from 'react';
import {Paper, Typography, Fade, Switch, ClickAwayListener, Button, IconButton} from '@material-ui/core/';
import Slider from '@material-ui/lab/Slider';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import Distortion from './Character/distortion.png';
import CloseIcon from '@material-ui/icons/Close';

class DistortionInFocus extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gain: this.props.mainReducer.effects.Distortion.settings.gain,
    }
  }

  handleChange = (event, value, name) => {
    this.setState({
      [name]: value
    }, this.props.sendDistortionChange(this.state))
  }

  handleSwitch = name => event => {
      this.props.switchDistortion(event.target.checked)
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
      <div id='effect-container'>
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
          <div>
            <Typography variant="headline">
              Distortion
            </Typography>
            <Switch
              checked={this.props.mainReducer.effects.Distortion.on}
              onChange={this.handleSwitch("ON")}
            />
          </div>
          <div className='ReverbChar'>
            <img src={Distortion} className="RevHall" width='170px' />
          </div>
          <Button size="small" color="primary" onClick={(name) => this.handleRemoveButton('Distortion')}>
            Remove Effect
          </Button>
        </div>
            <span className='right-side-effect-card'>
              <Typography id="label">Gain</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.Distortion.on}
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Distortion.settings.gain}
                onChange={(event, value, name) => this.handleChange(event, value, "gain")}
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
    sendDistortionChange: (payload) => {
      dispatch({
        type: "ALTER_DISTORTION",
        payload: payload
      })
    },
    switchDistortion: (payload) => {
      dispatch({
        type: "SWITCH_DISTORTION",
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DistortionInFocus));
