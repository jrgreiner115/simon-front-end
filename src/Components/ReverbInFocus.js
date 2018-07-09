import React, {Component} from 'react';
import Pizzicato from 'pizzicato';
import {Paper, Typography, Fade, Switch, ClickAwayListener, Button} from '@material-ui/core/';
import Slider from '@material-ui/lab/Slider';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import Theater from './Character/amphitheatre.png'

const styles = {
  textColor: {
    color: 'white'
  },
};

class ReverbInFocus extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mix: this.props.mainReducer.effects.Reverb.settings.mix,
      decay: this.props.mainReducer.effects.Reverb.settings.decay,
      time: this.props.mainReducer.effects.Reverb.settings.time,
    }
  }

  componentDidMount() {

  }

  handleChange = (event, value, name) => {
    this.setState({
      [name]: value
    }, this.props.sendReverbChange(this.state))
  }

  handleSwitch = name => event => {
      this.props.switchReverb(event.target.checked)
    };

  handleClickAway = (event) => {
    console.log(event);
    if (event.target.id === 'recordedAudioPlayer'|| event.target.id === 'main-audio-object' || event.target.id === 'recordedAudioPlayerIcon') {
      null
    }else {
      this.props.clearInFocusEffect("")
    }
  }

  handleRemoveButton = (name) => {
    this.props.removeEffect(name)
  }



  render() {
    let charHeight = (((this.state.decay)+(this.state.time)) * 20) + 30
    return (
      <div>
        <ClickAwayListener onClickAway={this.handleClickAway}>
        <Fade in>
        <Paper className='Effect-Paper'>
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
            <img src={Theater} className="RevHall" width={charHeight} style={{opacity:this.state.mix}}/>
          </div>
        </div>
        <span className='right-side-effect-card'>
              <Typography id="label">Mix</Typography>
              <Slider
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Reverb.settings.mix}
                onChange={(event, value, name) => this.handleChange(event, value, "mix")}
              />
              <Typography id="label">Time</Typography>
              <Slider
                max={3}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Reverb.settings.time}
                onChange={(event, value, name) => this.handleChange(event, value, "time")}
              />
              <Typography id="label">Decay</Typography>
              <Slider
                max={3}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Reverb.settings.decay}
                onChange={(event, value, name) => this.handleChange(event, value, "decay")}
              />
              <Button size="small" color="primary" onClick={(name) => this.handleRemoveButton('Reverb')}>
                Remove
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
