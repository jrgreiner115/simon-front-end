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
    return (<div id='effect-container'>
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <Fade in="in">
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
                  Tremolo
                </Typography>
                <Switch checked={this.props.mainReducer.effects.Tremolo.on} onChange={this.handleSwitch("ON")}/>
              </div>
              <div className='ReverbChar'>
                <img alt='Character iwth scuba gear' src={TremoloImage} className="RevHall" width='100px'/>
              </div>
              <Button size="small" color="primary" onClick={(name) => this.handleRemoveButton('Tremolo')}>
                Remove Effect
              </Button>
            </div>
            <span className='right-side-effect-card'>
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
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TremoloInFocus));
