import React, {Component} from 'react';
import Pizzicato from 'pizzicato';
import {ReactMic} from 'react-mic';
import Adapter from '../services/adapter';
import {Paper, Typography, Button, Fade} from '@material-ui/core/';
import {connect} from 'react-redux';
import {FiberManualRecord, Stop, PlayArrow, Save, Delete} from '@material-ui/icons/';
import { withRouter } from 'react-router-dom';

class Recorder extends Component {
constructor(props) {
  super(props)

  this.state = {
    record: false,
    fade: true,
    command: "none",
    loading: false
  }
}

componentDidMount = () => {
  let userId = localStorage.getItem("id")
  Adapter.getRecs(userId).then((json) =>{ this.props.getRecs(json.recordings)})
}


handleRecording = () => {
    this.setState({
      record: !this.state.record
    });
  }

stopRecording = () => {
     this.setState({
       record: false
     });
   }

onStop = (recordedBlob) =>  {
  console.log(recordedBlob);
  var sound = new Pizzicato.Sound({
    source: 'file',
    options: { path: [recordedBlob.blobURL] }
  }, () => {
    this.props.addRecording({sound: sound, blob: recordedBlob.blob})
  });
}

listenBeforeSave = () => {
  return (
  this.props.mainReducer.currentRecording.play())
}

handleClear = () => {
  this.props.clearRecording()
}

saveRecording = () => {
  this.setState({
    fade: false,
    loading: true,
  })
  Adapter.postRecord(this.props.mainReducer.currentBlob).then(thing =>{
  let newsound = new Pizzicato.Sound({
    source: 'file',
    options: { path: process.env.REACT_APP_AWS_TEST_URL }
  }, () => {
    this.props.satisfiedWithRecording(newsound)
  });}).then(() => setTimeout(() =>
  this.props.history.push('/edit'), 1200))
}

  render() {
    return (
      <React.Fragment>{!this.state.loading ? <Fade in={this.state.fade}>
    <div className='outer-div'>
    <Typography align="center" gutterBottom variant="display1">Record below to get started</Typography>
    <div>
    <Paper className='Main-Paper'>
      <br />
      <ReactMic
         record={this.state.record}
        className="sound-wave"
         onStop={this.onStop}
        strokeColor="#a174ad"
        nonstop='true'
        duration={10}
          />
        {!this.props.mainReducer.isRecorded ? <Button
          className='Recording'
          onClick={this.handleRecording}
          variant="fab"
          color="primary"
          aria-label="add"
          mini>
         {this.state.record ?
           <Stop /> :
           <FiberManualRecord
         />}</Button> :
           <div>
             <Button
               className='Play'
               onClick={this.listenBeforeSave}
               variant="fab"
               color="primary"
               aria-label="add" mini>
                <PlayArrow />
              </Button>
             <Button
               className='Save'
               onClick={this.saveRecording}
               variant="fab"
               color="primary"
               aria-label="add" mini>
               <Save/>
            </Button>
            <Button
              className='Save'
              onClick={this.handleClear}
              variant="fab"
              color="primary"
              aria-label="add" mini>
              <Delete/>
           </Button>
          </div>}
      <br /><br />
    </Paper>
    </div>
  </div>
</Fade> : <div className='outer-div'><Fade in><Paper className='Loading-Paper'><Typography variant='display1' align="center">Loading...</Typography></Paper></Fade></div>}
</React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    addRecording: (recording) => {
      dispatch({
        type: "ADD_RECORDING",
        payload: recording
      })
    },
    clearRecording: (recording) => {
      dispatch({
        type: "CLEAR_RECORDING",
        payload: recording
      })
    },
    satisfiedWithRecording: (recording) => {
      dispatch({
        type: "SATISFIED_WITH_RECORDING",
        payload: recording
      })
    },
    getRecs: (array) => {
      dispatch({
        type: "GET_RECORDINGS",
        payload: array
      })
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recorder));
