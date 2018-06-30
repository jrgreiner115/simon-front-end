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

class TremoloInFocus extends Component {
constructor(props) {
  super(props)

  this.state = {
    mix: 0,
    speed: 0,
    depth: 0
  }
}

  componentDidMount() {

  }

  handleChange = (event, value, name) => {
    this.setState({
      [name]: value
    }, this.props.sendTremoloChange(this.state))
  }

  handleSwitch = name => event => {
      this.props.switchTremolo(event.target.checked)
    };

  render() {
    return (
      <div>
        <Fade in>
        <Paper>
          <span>IMG ANIMATION SPAN</span>
          <span>
            <Typography variant="headline">
              Tremolo
            </Typography>
            <Switch
              checked={this.props.mainReducer.effects.Tremolo.on}
              onChange={this.handleSwitch("ON")}
            />
            <div>
              <Typography id="label">Mix</Typography>
              <Slider
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Tremolo.settings.mix}
                onChange={(event, value, name) => this.handleChange(event, value, "mix")}
              />
              <Typography id="label">Speed</Typography>
              <Slider
                max={1}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Tremolo.settings.speed}
                onChange={(event, value, name) => this.handleChange(event, value, "speed")}
              />
              <Typography id="label">Depth</Typography>
              <Slider
                max={5}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.Tremolo.settings.depth}
                onChange={(event, value, name) => this.handleChange(event, value, "depth")}
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
    sendTremoloChange: (payload) => {
      dispatch({
        type: "ALTER_TREMOLO",
        payload: payload
      })
    },
    switchTremolo: (payload) => {
      dispatch({
        type: "SWITCH_TREMOLO",
        payload
      })
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TremoloInFocus));
