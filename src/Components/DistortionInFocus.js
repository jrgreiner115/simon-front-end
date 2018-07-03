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

class DistortionInFocus extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gain: 0.4
    }
  }

  componentDidMount() {

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
        <Paper>
          <span>IMG ANIMATION SPAN</span>
          <span>
            <Typography variant="headline">
              Distortion
            </Typography>
            <Switch
              checked={this.props.mainReducer.effects.Distortion.on}
              onChange={this.handleSwitch("ON")}
            />
            <div>
              <Typography id="label">Gain</Typography>
              <Slider
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Distortion.settings.gain}
                onChange={(event, value, name) => this.handleChange(event, value, "gain")}
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
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DistortionInFocus));
