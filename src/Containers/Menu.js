import React from 'react';
import PropTypes from 'prop-types';
import Pizzicato from 'pizzicato'
import { withStyles } from '@material-ui/core/styles';
import {Drawer, Button, List, ListItem, Divider, ListItemText,IconButton, Snackbar} from '@material-ui/core/';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoadRecs from './loadRecs';
import SaveRecs from './saveRecName';
import Adapter from '../services/adapter';
import {Close, Settings} from '@material-ui/icons';
import toWav from 'audiobuffer-to-wav'
import FileSaver from 'file-saver'

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  white: {
    color: '#fff',
    float: 'left',
  },
  icons: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  zIndex: 900,
};

class TemporaryDrawer extends React.Component {
  state = {
    left: false,
    open: false,
    saveOpen: false,
    openSnack: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleLogout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('rec_path');
    localStorage.removeItem('rec_id');
    this.props.history.push('/login')
  }

  handleOpenRecording = () => {
    this.setState({
      open: true,
    });
  }

  handleOpenSaveRecording = () => {
    this.setState({
      saveOpen: true,
    });
  }

  handleClose = value => {
    this.setState({open: false });
    if (value) {
    localStorage.setItem("rec_path", value.path)
    localStorage.setItem("rec_id", value.id)
    this.props.setPath(value.path)

    let newsound = new Pizzicato.Sound({
      source: 'file',
      options: { path: `${process.env.REACT_APP_AWS_URL}${value.path}`}
    }, () => {
      this.props.satisfiedWithRecording(newsound)})
    this.props.history.push('/edit')
  }
}

  handleSaveClose = value => {
    this.setState({saveOpen: false });
  };

  handleNewRecording = () => {
    this.props.newRecording()
    this.props.history.push('/record')
  }

  handleDeleteRecording = () => {
    Adapter.deleteRecording(localStorage.getItem("rec_id"))

    localStorage.removeItem('rec_path');
    localStorage.removeItem('rec_id');
    this.setState({
      openSnack: true})
    this.handleNewRecording()
  }

  handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openSnack: false });
  };

  handleExport = () => {
    const ctx = Pizzicato.masterGainNode.context
    // ctx.decodeAudioData(process.env.REACT_APP_AWS_TEST_URL, function(buffer) {
    //   let myBuffer = buffer
    //   console.log(myBuffer);
    // })
    let buffer = ctx.createBuffer(2, 22050, 44100)
    let scriptNode = ctx.createScriptProcessor(4096, 1, 1)
    console.log(buffer, scriptNode.bufferSize, Pizzicato.masterGainNode);
    let wav = toWav(buffer)
    console.log("wav", wav)

    let file = new File([wav], 'export.wav', {type: 'audio/wav'})
    FileSaver.saveAs(file);
  }

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List component="nav">
        <ListItem button onClick={this.handleNewRecording}>
          <ListItemText primary="New" />
        </ListItem>
        <ListItem button onClick={this.handleOpenRecording}>
          <ListItemText primary="Open..." />
        </ListItem>
        <ListItem button disabled={!localStorage.getItem('rec_path')} onClick={this.handleOpenSaveRecording}>
          <ListItemText primary="Save As..." />
        </ListItem>
        <ListItem button disabled={!localStorage.getItem('rec_path')} onClick={this.handleDeleteRecording}>
          <ListItemText primary="Delete" />
        </ListItem>
        <ListItem button disabled={!localStorage.getItem('rec_path')} onClick={this.handleExport}>
          <ListItemText primary="Export" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav">
        <ListItem button component="a" href="#simple-list">
          <ListItemText onClick={this.handleLogout} primary="Log Out" />
        </ListItem>
      </List>
      </div>
    );



    return (
      <div>
        <Drawer
          anchor="left"
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
        <LoadRecs
          open={this.state.open}
          onClose={this.handleClose}
        />
        <SaveRecs
          open={this.state.saveOpen}
          onSaveClose={this.handleSaveClose}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openSnack}
          autoHideDuration={2500}
          onClose={this.handleSnackClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Recording Successfully Deleted</span>}
          action={
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleSnackClose}
            >
              <Close />
            </IconButton>
          }
        />
        <span className='settingsButton'>
        <Button className='Menu-button' id='recordedAudioPlayer' onClick={this.toggleDrawer('left', true)} variant="fab" color="primary" aria-label="add">
          <Settings/>
        </Button>
        </span>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    newRecording: () => {
      dispatch({
        type: "NEW_RECORDING_FROM_MENU",
        payload: false
      })
    },
    setPath: (path) => {
      dispatch({
        type: "SET_PATH",
        payload: path
      })
    },
    satisfiedWithRecording: (recording) => {
      dispatch({
        type: "SATISFIED_WITH_RECORDING",
        payload: recording
      })
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TemporaryDrawer)));
