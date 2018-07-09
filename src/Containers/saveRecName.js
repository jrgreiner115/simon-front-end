import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DialogTitle, Dialog, Typography, TextField, Button} from '@material-ui/core/';
import {connect} from 'react-redux';
import Adapter from '../services/adapter'
let rec_id = undefined

class SaveRec extends Component {
  constructor(props) {
    super(props)

    this.state = {
      recName: "",
    }
  }

  componentDidMount = () => {
    rec_id = localStorage.getItem("rec_id")
  }

  handleClose = () => {
    this.props.onSaveClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onSaveClose(value);
  };

  handleChange = (event) => {
    this.setState({
      recName: event.target.value
    })
  }

  handleSubmit = () => {
    Adapter.patchRecordingName(this.state.recName, rec_id)
    this.props.onSaveClose(this.props.selectedValue);
  }

  render() {
    return (
      <div>
      <Dialog onClose={this.handleClose}
        open={this.props.open} aria-labelledby="simple-dialog-title">
      <DialogTitle id="simple-dialog-title">
        Save Recording
      </DialogTitle>
      <div className="save-dialog">
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
            Save
          </Button>

        </form>
      </div>
    </Dialog>
    </div>);
  }

}
const mapStateToProps = (state) => {
    return state
  }

export default connect(mapStateToProps, null)(SaveRec);
