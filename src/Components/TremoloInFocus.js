import React, {Component} from 'react';
import Pizzicato from 'pizzicato';
import {Paper, Typography, Fade, Switch, ClickAwayListener} from '@material-ui/core/';
import Slider from '@material-ui/lab/Slider';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Beach from './Character/beach.png';

const styles = {
  textColor: {
    color: 'white'
  }
};

class TremoloInFocus extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mix: this.props.mainReducer.effects.Tremolo.settings.mix,
      speed: this.props.mainReducer.effects.Tremolo.settings.speed,
      depth: this.props.mainReducer.effects.Tremolo.settings.depth,
    }
  }

  componentDidMount() {}

  handleChange = (event, value, name) => {
    this.setState({
      [name]: value
    }, this.props.sendTremoloChange(this.state))
  }

  handleSwitch = name => event => {
    this.props.switchTremolo(event.target.checked)
  };

  handleClickAway = (event) => {
    console.log(event);
    if (event.target.id === 'recordedAudioPlayer' || event.target.id === 'main-audio-object' || event.target.id === 'recordedAudioPlayerIcon') {
      null
    } else {
      this.props.clearInFocusEffect("")
    }
  }

  render() {
    let charHeight = (((this.state.depth)+(this.state.speed)) * 5) + 30
    return (<div>
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <Fade in="in">
          <Paper className='Effect-Paper'>
            <div className='left-side-effect-card'>
              <div>
                <Typography variant="headline">
                  Tremolo
                </Typography>
                <Switch checked={this.props.mainReducer.effects.Tremolo.on} onChange={this.handleSwitch("ON")}/>
              </div>
              <div className='char-effect-div'>
                <img src={Beach} className="char-effect" width={charHeight} style={{opacity:this.state.mix}}/>
              </div>
            </div>
            <span className='right-side-effect-card'>
              <Typography id="label">Mix</Typography>
              <Slider max={1} min={0} aria-labelledby="label" value={this.props.mainReducer.effects.Tremolo.settings.mix} onChange={(event, value, name) => this.handleChange(event, value, "mix")}/>
              <Typography id="label">Speed</Typography>
              <Slider max={20} min={0} aria-labelledby="label" value={this.props.mainReducer.effects.Tremolo.settings.speed} onChange={(event, value, name) => this.handleChange(event, value, "speed")}/>
              <Typography id="label">Depth</Typography>
              <Slider max={1} min={0} aria-labelledby="label" value={this.props.mainReducer.effects.Tremolo.settings.depth} onChange={(event, value, name) => this.handleChange(event, value, "depth")}/>
            </span>
          </Paper>
        </Fade>
      </ClickAwayListener>
    </div>)
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendTremoloChange: (payload) => {
      dispatch({type: "ALTER_TREMOLO", payload: payload})
    },
    switchTremolo: (payload) => {
      dispatch({type: "SWITCH_TREMOLO", payload})
    },
    clearInFocusEffect: (payload) => {
      dispatch({type: "CLEAR_INFOCUS_EFFECT", payload: payload})
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TremoloInFocus));
