import React, {Component} from 'react';
import Pizzicato from 'pizzicato';
import {Paper, Typography, Fade, Switch, ClickAwayListener} from '@material-ui/core/';
import Slider from '@material-ui/lab/Slider';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

const styles = {
  textColor: {
    color: 'white'
  },
};

class LowPassInFocus extends Component {
  constructor(props) {
    super(props)

    this.state = {
      frequency: this.props.mainReducer.effects.LowPass.settings.frequency,
      peak: this.props.mainReducer.effects.LowPass.settings.peak,
    }
  }

  componentDidMount() {

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
    if (event.target.id === 'recordedAudioPlayer'|| event.target.id === 'main-audio-object' || event.target.id === 'recordedAudioPlayerIcon') {
      null
    }else {
      this.props.clearInFocusEffect("")
    }
  }



  render() {
    return (
      <div>
        <ClickAwayListener onClickAway={this.handleClickAway}>
        <Fade in>
        <Paper className='Effect-Paper'>
          <span className='left-side-effect-card'>
          <span>IMG ANIMATION SPAN</span>
          <span>
            <Typography variant="headline">
              LowPass
            </Typography>
            <Switch
              checked={this.props.mainReducer.effects.LowPass.on}
              onChange={this.handleSwitch("ON")}
            />
                </span>
              </span>
            <span className='right-side-effect-card'>
              <Typography id="label">Frequency</Typography>
              <Slider
                max={22050}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.LowPass.settings.frequency}
                onChange={(event, value, name) => this.handleChange(event, value, "frequency")}
              />
              <Typography id="label">Peak</Typography>
              <Slider
                max={1000}
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
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LowPassInFocus));
