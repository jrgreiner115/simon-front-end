import React, {Component} from 'react';
import {Paper, Typography, Fade, Switch, ClickAwayListener, Button, IconButton} from '@material-ui/core/';
import Slider from '@material-ui/lab/Slider';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import LowPass from './Character/lowPass.png'
import CloseIcon from '@material-ui/icons/Close';

class LowPassInFocus extends Component {
  constructor(props) {
    super(props)

    this.state = {
      frequency: this.props.mainReducer.effects.LowPass.settings.frequency,
      peak: this.props.mainReducer.effects.LowPass.settings.peak,
    }
  }

  handleChange = (event, value, name) => {
    this.setState({
      [name]: value
    }, this.props.sendLowPassChange(this.state))
  }

  handleSwitch = name => event => {
      this.props.switchLowPass(event.target.checked)
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
              Low Pass Filter
            </Typography>
            <Switch
              checked={this.props.mainReducer.effects.LowPass.on}
              onChange={this.handleSwitch("ON")}
            />
          </div>
          <div className='ReverbChar'>
            <img src={LowPass} alt='character listening to some sick beats' className="RevHall" width='150px' />
          </div>
          <Button size="small" color="primary" onClick={(name) => this.handleRemoveButton('LowPass')}>
            Remove Effect
          </Button>
        </div>
            <span className='right-side-effect-card'>
              <Typography variant='body2'>Low Pass Filters are used to make muffled sounds. These are often used in EDM music for the drop! Adjust the frequency to 0% to increase the muffling.</Typography>
              <br />
              <Typography id="label">Frequency</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.LowPass.on}
                max={22050}
                min={10}
                aria-labelledby="label" value={this.props.mainReducer.effects.LowPass.settings.frequency}
                onChange={(event, value, name) => this.handleChange(event, value, "frequency")}
              />
              <Typography id="label">Peak</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.LowPass.on}
                max={20}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.LowPass.settings.peak}
                onChange={(event, value, name) => this.handleChange(event, value, "peak")}
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
    sendLowPassChange: (payload) => {
      dispatch({
        type: "ALTER_LOWPASS",
        payload: payload
      })
    },
    switchLowPass: (payload) => {
      dispatch({
        type: "SWITCH_LOWPASS",
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LowPassInFocus));
