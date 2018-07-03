import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux';
import SvgIcon from '@material-ui/core/SvgIcon';
import ReverbIcon from './Icons/ReverbIcon'
import FuzzIcon from './Icons/FuzzIcon'
import DelayIcon  from './Icons/DelayIcon'
import DistortionIcon  from './Icons/DistortionIcon'
import FlangerIcon  from './Icons/FlangerIcon'
import TremoloIcon  from './Icons/TremoloIcon'
import LowPassIcon  from './Icons/LowPassIcon'
import HighPassIcon  from './Icons/HighPassIcon'


const styles = theme => ({
  root: {
    height: 380,
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

class SpeedDialer extends Component {
  state = {
    open: false,
    hidden: false,
  };

  handleVisibility = () => {
    this.setState(state => ({
      open: false,
      hidden: !state.hidden,
    }));
  };

  handleClick = (name) => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleOpen = () => {
    if (!this.state.hidden) {
      this.setState({
        open: true,
      });
    }
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleDelayClick = () => {
    this.setState({
      open: !this.state.open,
    });
    this.props.addDelay()
  };

  handleReverbClick = () => {
    this.setState({
      open: !this.state.open,
    });
    this.props.addReverb()
  };

  handleDistortionClick = () => {
    this.setState({
      open: !this.state.open,
    });
    this.props.addDistortion()
  };

  handleFlangerClick = () => {
    this.setState({
      open: !this.state.open,
    });
    this.props.addFlanger()
  };

  handleTremoloClick = () => {
    this.setState({
      open: !this.state.open,
    });
    this.props.addTremolo()
  };

  handleFuzzClick = () => {
    this.setState({
      open: !this.state.open,
    });
    this.props.addFuzz()
  };

  handleLowPassClick = () => {
    this.setState({
      open: !this.state.open,
    });
    this.props.addLowPass()
  };

  handleHighPassClick = () => {
    this.setState({
      open: !this.state.open,
    });
    this.props.addHighPass()
  };



  render() {
    const { classes } = this.props;
    const { hidden, open } = this.state;

    let isTouch;
    if (typeof document !== 'undefined') {
      isTouch = 'ontouchstart' in document.documentElement;
    }
    // console.log("PROPS", this.props)
    return (
      <div className={classes.root}>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onBlur={this.handleClose}
          onClose={this.handleClose}
          onFocus={isTouch ? undefined : this.handleOpen}
          onMouseEnter={isTouch ? undefined : this.handleOpen}
          onMouseLeave={this.handleClose}
          open={open}
        >
          <SpeedDialAction
            key="Delay"
            icon={<DelayIcon
              style={{"padding-top": "9%"}}/>}
            tooltipTitle={"Delay"}
            onClick={(name) => this.handleDelayClick("Delay")}
          />
          <SpeedDialAction
            key="Reverb"
            icon={<ReverbIcon/>}
            tooltipTitle={"Reverb"}
            onClick={(name) => this.handleReverbClick("Reverb")}
          />
          <SpeedDialAction
            key="Distortion"
            icon={<DistortionIcon
              style={{"padding-top": "20%"}}/>}
            tooltipTitle={"Distortion"}
            onClick={(name) => this.handleDistortionClick("Distortion")}
          />
          <SpeedDialAction
            key="Flanger"
            icon={<FlangerIcon
              style={{"padding-top": "20%"}}/>}
            tooltipTitle={"Flanger"}
            onClick={(name) => this.handleFlangerClick("Flanger")}
          />
          <SpeedDialAction
            key="Tremolo"
            icon={<TremoloIcon
              style={{"padding-top": "20%"}}/>}
            tooltipTitle={"Tremolo"}
            onClick={(name) => this.handleTremoloClick("Tremolo")}
          />
          <SpeedDialAction
            key="Fuzz"
            icon={<FuzzIcon
              style={{"padding-top": "20%"}} />}
            tooltipTitle={"Fuzz"}
            onClick={(name) => this.handleFuzzClick("Fuzz")}
          />
          <SpeedDialAction
            key="LowPass"
            icon={<LowPassIcon
              style={{"padding-top": "16%"}} />}
            tooltipTitle={"LowPass"}
            onClick={(name) => this.handleLowPassClick("LowPass")}
          />
          <SpeedDialAction
            key="HighPass"
            icon={<HighPassIcon
              style={{"padding-top": "3%", "padding-left": "7%"}} />}
            tooltipTitle={"HighPass"}
            onClick={(name) => this.handleHighPassClick("HighPass")}
          />
        </SpeedDial>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    addDelay: () => {
      dispatch({
        type: "ADD_DELAY",
        payload: "did it!"
      })
    },
    addReverb: () => {
      dispatch({
        type: "ADD_REVERB",
        payload: "did it!"
      })
    },
    addDistortion: () => {
      dispatch({
        type: "ADD_DISTORTION",
        payload: "did it!"
      })
    },
    addFlanger: () => {
      dispatch({
        type: "ADD_FLANGER",
        payload: "did it!"
      })
    },
    addTremolo: () => {
      dispatch({
        type: "ADD_TREMOLO",
        payload: "did it!"
      })
    },
    addFuzz: () => {
      dispatch({
        type: "ADD_FUZZ",
        payload: "did it!"
      })
    },
    addLowPass: () => {
      dispatch({
        type: "ADD_LOWPASS",
        payload: "did it!"
      })
    },
    addHighPass: () => {
      dispatch({
        type: "ADD_HIGHPASS",
        payload: "did it!"
      })
    },

    }
  }

SpeedDialer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SpeedDialer));
