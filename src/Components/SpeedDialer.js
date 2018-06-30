import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import ContentCopyIcon from '@material-ui/icons/ContentCopy';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux';

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
            icon={<SaveIcon />}
            tooltipTitle={"Delay"}
            onClick={(name) => this.handleDelayClick("Delay")}
          />
          <SpeedDialAction
            key="Reverb"
            icon={<PrintIcon />}
            tooltipTitle={"Reverb"}
            onClick={(name) => this.handleReverbClick("Reverb")}
          />
          <SpeedDialAction
            key="Distortion"
            icon={<PrintIcon />}
            tooltipTitle={"Distortion"}
            onClick={(name) => this.handleDistortionClick("Distortion")}
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
    }
  }

SpeedDialer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SpeedDialer));
