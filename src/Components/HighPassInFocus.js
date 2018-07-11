import React, {Component} from 'react';
import {Paper, Typography, Fade, Switch, ClickAwayListener, Button, IconButton} from '@material-ui/core/';
import Slider from '@material-ui/lab/Slider';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import HiPass from './Character/hiPass.png';
import CloseIcon from '@material-ui/icons/Close';

class HighPassInFocus extends Component {
  constructor(props) {
    super(props)

    this.state = {
      frequency: this.props.mainReducer.effects.HighPass.settings.frequency,
      peak: this.props.mainReducer.effects.HighPass.settings.peak,
    }
  }

    componentDidMount() {

    }

    handleChange = (event, value, name) => {
      this.setState({
        [name]: value
      }, this.props.sendHighPassChange(this.state))
    }

    handleSwitch = name => event => {
        this.props.switchHighPass(event.target.checked)
      };

    handleClickAway = (event) => {
      console.log(event);
      if (event.target.id === 'recordedAudioPlayer'|| event.target.id === 'main-audio-object' || event.target.id === 'recordedAudioPlayerIcon' || event.target.id === 'effect-container' || event.target.id === 'Menu-actions' || event.target=== 'svg'||
      event.path[2].id === 'recordedAudioPlayerIcon') {
        return null
      }else {
        this.props.clearInFocusEffect("")
      }
    }

    handleRemoveButton = (name) => {
      this.props.removeEffect(name)
      this.props.clearInFocusEffect("")
    }

    handleEffectClose = () => {
      this.props.clearInFocusEffect("")
    }



  render() {
    return (
      <div id='effect-container'>
        <ClickAwayListener onClickAway={this.handleClickAway}>
        <Fade in>
          <Paper
            className='Effect-Paper'
            style={{
              borderRadius: '40px',
            }} >
          <div className="effect-close">
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleEffectClose}
            >
              <CloseIcon
                style={{color: 'rgba(0, 0, 0, 0.54'}}/>
            </IconButton>
          </div>
          <div className='left-side-effect-card'>
            <div className='Effect-Details'>
            <Typography variant="headline">
              High Pass Filter
            </Typography>
            <Switch
              checked={this.props.mainReducer.effects.HighPass.on}
              onChange={this.handleSwitch("ON")}
            />
          </div>
          <div className='ReverbChar'>
            <img src={HiPass} className="RevHall" alt='character on safari' width='150px' />
          </div>
        </div>
        <span className='right-side-effect-card'>
              <Typography variant='body2'>The Oppposite of a Low Pass Filter. As you increase the frequency, it cuts the lows from your audio! Also used in EDM music. I like meerkats. I think they would like High Pass Filters.</Typography>
              <br />
              <Typography id="label">Frequency</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.HighPass.on}
                max={22050}
                min={10}
                aria-labelledby="label" value={this.props.mainReducer.effects.HighPass.settings.frequency}
                onChange={(event, value, name) => this.handleChange(event, value, "frequency")}
              />
              <Typography id="label">Peak</Typography>
              <Slider
                disabled={!this.props.mainReducer.effects.HighPass.on}
                max={50}
                min={0}
                aria-labelledby="label" value={this.props.mainReducer.effects.HighPass.settings.peak}
                onChange={(event, value, name) => this.handleChange(event, value, "peak")}
              />
              <br />
              <Button variant="contained" color="secondary" onClick={(name) => this.handleRemoveButton('HighPass')}>
                Remove Effect
              </Button>
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
    sendHighPassChange: (payload) => {
      dispatch({
        type: "ALTER_HIGHPASS",
        payload: payload
      })
    },
    switchHighPass: (payload) => {
      console.log(payload);
      dispatch({
        type: "SWITCH_HIGHPASS",
        payload
      })
    },
    clearInFocusEffect: (payload) => {
      dispatch({
        type: "CLEAR_INFOCUS_EFFECT",
        payload: payload
      })
    },
    removeEffect: (name) => {
      dispatch({
        type: "REMOVE_EFFECT",
        payload: name
      })
    },
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HighPassInFocus));
