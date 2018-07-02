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

class ReverbInFocus extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mix: 0,
      decay: 0,
      time: 0
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
    if (event.path[4].id === 'recordedAudioPlayer'|| event.path[2].id === 'recordedAudioPlayer' || event.path[0].id === 'recordedAudioPlayer'|| event.target.id === 'main-audio-object') {
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
        <Paper>
          <span>IMG ANIMATION SPAN</span>
          <span>
            <Typography variant="headline">
              Reverb
            </Typography>
            <Switch
              checked={this.props.mainReducer.effects.Reverb.on}
              onChange={this.handleSwitch("ON")}
            />
            <div>
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
            </div>
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
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReverbInFocus));
