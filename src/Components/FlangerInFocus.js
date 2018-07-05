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

class FlangerInFocus extends Component {
constructor(props) {
  super(props)

  this.state = {
    time: this.props.mainReducer.effects.Flanger.settings.time,
    speed: this.props.mainReducer.effects.Flanger.settings.speed,
    depth: this.props.mainReducer.effects.Flanger.settings.depth,
    feedback: this.props.mainReducer.effects.Flanger.settings.feedback,
    mix: this.props.mainReducer.effects.Flanger.settings.mix,
  }
}

componentDidMount() {

}

  handleChange = (event, value, name) => {
    this.setState({
      [name]: value
    }, this.props.sendFlangerChange(this.state))
  }

  handleSwitch = name => event => {
      this.props.switchFlanger(event.target.checked)
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
              Flanger
            </Typography>
            <Switch
              checked={this.props.mainReducer.effects.Flanger.on}
              onChange={this.handleSwitch("ON")}
            />
              </span>
            </span>
            <span className='right-side-effect-card'>
              <Typography id="label">Mix</Typography>
              <Slider
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Flanger.settings.mix}
                onChange={(event, value, name) => this.handleChange(event, value, "mix")}
              />
              <Typography id="label">Time</Typography>
              <Slider
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Flanger.settings.time}
                onChange={(event, value, name) => this.handleChange(event, value, "time")}
              />
              <Typography id="label">Speed</Typography>
              <Slider
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Flanger.settings.speed}
                onChange={(event, value, name) => this.handleChange(event, value, "speed")}
              />
              <Typography id="label">Depth</Typography>
              <Slider
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Flanger.settings.depth}
                onChange={(event, value, name) => this.handleChange(event, value, "depth")}
              />
              <Typography id="label">Feedback</Typography>
              <Slider
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Flanger.settings.feedback}
                onChange={(event, value, name) => this.handleChange(event, value, "feedback")}
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
    sendFlangerChange: (payload) => {
      dispatch({
        type: "ALTER_FLANGER",
        payload: payload
      })
    },
    switchFlanger: (payload) => {
      dispatch({
        type: "SWITCH_FLANGER",
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FlangerInFocus));
