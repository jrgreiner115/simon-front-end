import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Drawer, Button, List, ListItem, Divider, ListItemIcon,ListItemText,} from '@material-ui/core/';
import {connect} from 'react-redux';
import { routeActions } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import LoadRecs from './loadRecs'
import SaveRecs from './saveRecName'


const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  white: {
    color: '#fff',
    float: 'right',
  },
  icons: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  zIndex: 900,
};

class TemporaryDrawer extends React.Component {
  state = {
    right: false,
    open: false,
    saveOpen: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleLogout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('recordings');
    localStorage.removeItem('username')
    localStorage.removeItem('token');
    localStorage.removeItem('rec_path');
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
    this.props.history.push('/edit')}
  };

  handleSaveClose = value => {
    this.setState({saveOpen: false });
  };

  handleNewRecording = () => {
    this.props.history.push('/record')
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
          <ListItemText primary="Open" />
        </ListItem>
        <ListItem button onClick={this.handleOpenSaveRecording}>
          <ListItemText primary="Save" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Export" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav">
        <ListItem button>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button component="a" href="#simple-list">
          <ListItemText onClick={this.handleLogout} primary="Log Out" />
        </ListItem>
      </List>
      </div>
    );



    return (
      <div className='Menu-button'>
        <Button
          className={classes.white}
          onClick={this.toggleDrawer('right', true)}>
            Options
        </Button>
        <Drawer
          anchor="right"
          open={this.state.right}
          onClose={this.toggleDrawer('right', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
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

export default withRouter(connect(mapStateToProps, null)(withStyles(styles)(TemporaryDrawer)));
