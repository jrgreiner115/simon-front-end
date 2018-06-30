import React, {Component} from 'react';
import Pizzicato from 'pizzicato';
import {Paper, Typography, Fade, Switch} from '@material-ui/core/';
import Slider from '@material-ui/lab/Slider';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

const styles = {
  textColor: {
    color: 'white'
  },
};

class DelayInFocus extends Component {
constructor(props) {
  super(props)

  this.state = {
    mix: 0,
    feedback: 0,
    time: 0
  }
}

componentDidMount() {

}

handleChange = (event, value, name) => {
  this.setState({
    [name]: value
  }, this.props.sendDelayChange(this.state))
}

handleSwitch = name => event => {
    console.log(event.target.checked);
    this.props.switchDelay(event.target.checked)
  };



  render() {
    console.log("DELAY PROPS", this.props.mainReducer.effects.Delay.on);
    return (
      <div>
        <Fade in>
        <Paper>
          <span>IMG ANIMATION SPAN</span>
          <span>
            <Typography variant="headline">
              Delay
            </Typography>
            <Switch
              checked={this.props.mainReducer.effects.Delay.on}
              onChange={this.handleSwitch("ON")}
            />
            <div>
              <Typography id="label">Mix</Typography>
              <Slider
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Delay.settings.mix}
                onChange={(event, value, name) => this.handleChange(event, value, "mix")}
              />
              <Typography id="label">Feedback</Typography>
              <Slider
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Delay.settings.feedback}
                onChange={(event, value, name) => this.handleChange(event, value, "feedback")}
              />
              <Typography id="label">Time</Typography>
              <Slider
                max={5}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Delay.settings.time}
                onChange={(event, value, name) => this.handleChange(event, value, "time")}
              />
            </div>
          </span>
        </Paper>
        </Fade>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    addRecording: (recording) => {
      dispatch({
        type: "ADD_RECORDING",
        payload: recording
      })
    },
    sendDelayChange: (payload) => {
      dispatch({
        type: "ALTER_DELAY",
        payload: payload
      })
    },
    switchDelay: (payload) => {
      console.log(payload);
      dispatch({
        type: "SWITCH_DELAY",
        payload
      })
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DelayInFocus));
