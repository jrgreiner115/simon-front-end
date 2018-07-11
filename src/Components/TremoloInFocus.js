import React, {Component} from 'react';
import {Paper, Typography, Fade, Switch, ClickAwayListener, Button, IconButton} from '@material-ui/core/';
import Slider from '@material-ui/lab/Slider';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import TremoloImage from './Character/Tremolo.png';
import CloseIcon from '@material-ui/icons/Close';

class TremoloInFocus extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mix: this.props.mainReducer.effects.Tremolo.settings.mix,
      speed: this.props.mainReducer.effects.Tremolo.settings.speed,
      depth: this.props.mainReducer.effects.Tremolo.settings.depth,
    }
  }


  handleChange = (event, value, name) => {
    this.setState({
      [name]: value
    }, this.props.sendTremoloChange(this.state))
  }

  handleSwitch = name => event => {
    this.props.switchTremolo(event.target.checked)
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
    return (<div id='effect-container'>
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <Fade in="in">
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
                  Tremolo
                </Typography>
              </div>
              <div className='ReverbChar'>
                <img alt='Character iwth scuba gear' src={TremoloImage} className="RevHall" width='150px'/>
              </div>
            </div>
            <span className='right-side-effect-card'>
              <Typography variant='body2'>Tremolo is like turning the volume knob on a speaker up and down, very very quickly and accurately. Tremolo is used in a lot of Classic Rock, especially in Surf Rock, but can be used to make a stuttering effect, too (turn the Mix & Depth up to 100%)! </Typography>
              <br />
              <Typography id="label">Mix</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.Tremolo.on}
                max={1}
                min={0}
                aria-labelledby="label"
                value={this.props.mainReducer.effects.Tremolo.settings.mix}
                onChange={(event, value, name) => this.handleChange(event, value, "mix")}/>
              <Typography id="label">Speed</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.Tremolo.on}
                max={20}
                min={0}
                aria-labelledby="label"
                value={this.props.mainReducer.effects.Tremolo.settings.speed}
                onChange={(event, value, name) => this.handleChange(event, value, "speed")}/>
              <Typography id="label">Depth</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.Tremolo.on}
                max={1}
                min={0}
                aria-labelledby="label"
                value={this.props.mainReducer.effects.Tremolo.settings.depth}
                onChange={(event, value, name) => this.handleChange(event, value, "depth")}/>
                <br />
                <div class="effect-options">
                  <Switch
                    style={{marginRight: '10px'}}
                    color='primary'
                    checked={this.props.mainReducer.effects.Tremolo.on}
                    onChange={this.handleSwitch("ON")}
                  />
                  <Button
                    style={{marginRight: '10px'}}
                    variant="extendedFab" color="primary" onClick={this.handleEffectClose}>
                    Save
                  </Button>

                  <Button
                    style={{marginRight: '10px'}}
                    variant="extendedFab" color="primary" onClick={(name) => this.handleRemoveButton('Tremolo')}>
                    Remove
                  </Button>
                </div>
            </span>
          </Paper>
        </Fade>
      </ClickAwayListener>
    </div>)
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendTremoloChange: (payload) => {
      dispatch({type: "ALTER_TREMOLO", payload: payload})
    },
    switchTremolo: (payload) => {
      dispatch({type: "SWITCH_TREMOLO", payload})
    },
    clearInFocusEffect: (payload) => {
      dispatch({type: "CLEAR_INFOCUS_EFFECT", payload: payload})
    },
    removeEffect: (name) => {
      dispatch({
        type: "REMOVE_EFFECT",
        payload: name
      })
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TremoloInFocus));
