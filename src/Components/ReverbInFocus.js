import React, {Component} from 'react';
import {Paper, Typography, Fade, Switch, ClickAwayListener, Button, IconButton} from '@material-ui/core/';
import Slider from '@material-ui/lab/Slider';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import Reverb from './Character/reverb.png';
import CloseIcon from '@material-ui/icons/Close';

class ReverbInFocus extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mix: this.props.mainReducer.effects.Reverb.settings.mix,
      decay: this.props.mainReducer.effects.Reverb.settings.decay,
      time: this.props.mainReducer.effects.Reverb.settings.time,
    }
  }

  handleChange = (event, value, name) => {
    this.setState({
      [name]: value
    }, () => {
      this.props.sendReverbChange(this.state);
    })

  }

  handleSwitch = name => event => {
      this.props.switchReverb(event.target.checked)
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
          <div className='Effect-Details'>
            <Typography variant="headline">
              Reverb
            </Typography>

            <Switch
              checked={this.props.mainReducer.effects.Reverb.on}
              onChange={this.handleSwitch("ON")}
            />
          </div>
          <div className='ReverbChar'>
            <img src={Reverb} className="RevHall" width='170px' />
          </div>
          <Button size="small" color="primary" onClick={(name) => this.handleRemoveButton('Reverb')}>
            Remove Effect
          </Button>
        </div>
        <span className='right-side-effect-card'>
              <Typography id="label">Mix</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.Reverb.on}
                max={1}
                min={0}
                aria-labelledby="label"
                value={this.props.mainReducer.effects.Reverb.settings.mix}
                onChange={(event, value, name) => this.handleChange(event, value, "mix")}
              />
              <Typography id="label">Time</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.Reverb.on}
                max={3}
                min={0}
                aria-labelledby="label"
                value={this.props.mainReducer.effects.Reverb.settings.time}
                onChange={(event, value, name) => this.handleChange(event, value, "time")}
              />
              <Typography id="label">Decay</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.Reverb.on}
                max={3}
                min={0}
                aria-labelledby="label"
                value={this.props.mainReducer.effects.Reverb.settings.decay}
                onChange={(event, value, name) => this.handleChange(event, value, "decay")}
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
    sendReverbChange: (payload) => {
      dispatch({
        type: "ALTER_REVERB",
        payload: payload
      })
    },
    switchReverb: (payload) => {
      dispatch({
        type: "SWITCH_REVERB",
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReverbInFocus));
