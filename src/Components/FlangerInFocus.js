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

class FlangerInFocus extends Component {
constructor(props) {
  super(props)

  this.state = {
    time: 0.45,
    speed: 0.2,
    depth: 0.1,
    feedback: 0.1,
    mix: 0.5
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



  render() {
    return (
      <div>
        <Fade in>
        <Paper>
          <span>IMG ANIMATION SPAN</span>
          <span>
            <Typography variant="headline">
              Flanger
            </Typography>
            <Switch
              checked={this.props.mainReducer.effects.Flanger.on}
              onChange={this.handleSwitch("ON")}
            />
            <div>
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
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FlangerInFocus));
