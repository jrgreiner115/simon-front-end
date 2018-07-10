import React, {Component} from 'react';
import {DialogTitle, Dialog, List, ListItem, ListItemText} from '@material-ui/core/';
import {connect} from 'react-redux';

class LoadRecs extends Component {

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    console.log(value);
    this.props.onClose(value);
  };

  render() {
    return (
      <Dialog onClose={this.handleClose}
        open={this.props.open} aria-labelledby="simple-dialog-title">
      <DialogTitle id="simple-dialog-title">
        Open Recording
      </DialogTitle>
      <div>
        <List>
        {this.props.mainReducer.recordings.map(recording => (
          <ListItem button onClick={() => this.handleListItemClick(recording)} key={recording.path}>
            <ListItemText primary={recording.name} />
          </ListItem>
        ))}
        </List>
      </div>
    </Dialog>);
  }

}
const mapStateToProps = (state) => {
    return state
  }

export default connect(mapStateToProps, null)(LoadRecs);
