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

class LowPassInFocus extends Component {
constructor(props) {
  super(props)

  this.state = {
    volume: 0,
    frequency: 0,
    peak: 0
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
    console.log(event.target.checked);
    this.props.switchLowPass(event.target.checked)
  };



  render() {
    console.log("LOWPASS PROPS", this.props.mainReducer.effects.LowPass.on);
    return (
      <div>
        <Fade in>
        <Paper>
          <span>IMG ANIMATION SPAN</span>
          <span>
            <Typography variant="headline">
              LowPass
            </Typography>
            <Switch
              checked={this.props.mainReducer.effects.LowPass.on}
              onChange={this.handleSwitch("ON")}
            />
            <div>
              <Typography id="label">Volume</Typography>
              <Slider
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.LowPass.settings.volume}
                onChange={(event, value, name) => this.handleChange(event, value, "volume")}
              />
              <Typography id="label">Frequency</Typography>
              <Slider
                max={22050}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.LowPass.settings.frequency}
                onChange={(event, value, name) => this.handleChange(event, value, "frequency")}
              />
              <Typography id="label">Peak</Typography>
              <Slider
                max={10}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.LowPass.settings.peak}
                onChange={(event, value, name) => this.handleChange(event, value, "peak")}
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
    sendLowPassChange: (payload) => {
      dispatch({
        type: "ALTER_LOWPASS",
        payload: payload
      })
    },
    switchLowPass: (payload) => {
      console.log(payload);
      dispatch({
        type: "SWITCH_LOWPASS",
        payload
      })
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LowPassInFocus));