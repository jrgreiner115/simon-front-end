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
    console.log(event.target.checked);
    this.props.switchReverb(event.target.checked)
  };



  render() {
    console.log("REVERB PROPS", this.props.mainReducer.effects.Reverb.on);
    return (
      <div>
        <Fade in>
        <Paper>
          <span>IMG ANIMATION SPAN</span>
          <span>
            <Typography variant="headline">
              Reverb
            </Typography>
            {/*  HOOK THIS UP TO A REDUX ACTION LATER THAN TURNS THE EFFECT ON/OFF*/}
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
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Reverb.settings.time}
                onChange={(event, value, name) => this.handleChange(event, value, "time")}
              />
              <Typography id="label">Decay</Typography>
              <Slider
                max={5}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Reverb.settings.decay}
                onChange={(event, value, name) => this.handleChange(event, value, "decay")}
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
    sendReverbChange: (payload) => {
      dispatch({
        type: "ALTER_REVERB",
        payload: payload
      })
    },
    switchReverb: (payload) => {
      console.log(payload);
      dispatch({
        type: "SWITCH_REVERB",
        payload
      })
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReverbInFocus));
