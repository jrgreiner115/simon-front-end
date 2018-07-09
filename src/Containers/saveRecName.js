import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DialogTitle, Dialog, Typography, TextField, Button} from '@material-ui/core/';
import {connect} from 'react-redux';

class SaveRec extends Component {
  constructor(props) {
    super(props)

    this.state = {
      recName: "",
    }
  }

  handleClose = () => {
    this.props.onSaveClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    console.log(value);
    this.props.onSaveClose(value);
  };

  handleChange = (event) => {
    this.setState({
      recName: event.target.value
    })
  }

  handleSubmit = () => {
    Adapter.patchRecordingName(this.state.recName)
  }

  render() {
    console.log("SAVEREC PROPS,", this.props);
    return (
      <Dialog onClose={this.handleClose}
        open={this.props.saveRecOpen} aria-labelledby="simple-dialog-title">
      <DialogTitle id="simple-dialog-title">
        Save Recording
      </DialogTitle>
      <div>
        <form>
          <TextField
          id="save-recording"
          label="recording name"
          name="recording-name"
          value={this.state.recName}
          onChange={this.handleChange}
          margin="normal"
          />
          <br /><br />
          <Button
            variant='contained'
            color='primary'
            onClick={this.handleSubmit}>
            Save As
          </Button>

        </form>
      </div>
    </Dialog>);
  }

}
const mapStateToProps = (state) => {
    return state
  }

export default connect(mapStateToProps, null)(SaveRec);
