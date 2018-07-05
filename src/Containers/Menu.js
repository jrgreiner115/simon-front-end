import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Drawer, Button, List, ListItem, Divider, ListItemIcon,ListItemText, } from '@material-ui/core/';
import {Menu, Drafts, Inbox} from '@material-ui/icons/';
import {connect} from 'react-redux';
import { routeActions } from 'react-router-redux';
import { withRouter } from 'react-router-dom';


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
};

class TemporaryDrawer extends React.Component {
  state = {
    right: false,
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

    this.props.history.push('/login')
  }

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List component="nav">
        <ListItem button>
          <ListItemText primary="Recordings" />
        </ListItem>
        <ListItem button>
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

    const fullList = (
      <div className={classes.fullList}>
        <List>{["1","2","3"]}</List>
        <Divider />
        <List>{["1","2","3"]}</List>
      </div>
    );

    return (
      <div>
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
