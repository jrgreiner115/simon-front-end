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

  componentDidMount() {

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
              Fuzz
            </Typography>
            <Switch
              checked={this.props.mainReducer.effects.Fuzz.on}
              onChange={this.handleSwitch("ON")}
            />
          </span>
        </span>
        <span className='right-side-effect-card'>
              <Typography id="label">Mix</Typography>
              <Slider
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Fuzz.settings.mix}
                onChange={(event, value, name) => this.handleChange(event, value, "mix")}
              />
              <Typography id="label">Low Gain</Typography>
              <Slider
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Fuzz.settings.lowGain}
                onChange={(event, value, name) => this.handleChange(event, value, "lowGain")}
              />
              <Typography id="label">Mid Low Gain</Typography>
              <Slider
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Fuzz.settings.midLowGain}
                onChange={(event, value, name) => this.handleChange(event, value, "midLowGain")}
              />
              <Typography id="label">Mid High Gain</Typography>
              <Slider
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Fuzz.settings.midHighGain}
                onChange={(event, value, name) => this.handleChange(event, value, "midHighGain")}
              />
              <Typography id="label">High</Typography>
              <Slider
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
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FuzzInFocus));
