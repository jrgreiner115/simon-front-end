import React, {Component} from 'react';
import Pizzicato from 'pizzicato';
import {ReactMic} from 'react-mic';
import {Paper, Typography, TextField, Button, Icon, Fade} from '@material-ui/core/';
import {connect} from 'react-redux';
import {FiberManualRecord, Stop, PlayArrow, Pause, Save, Delete} from '@material-ui/icons/';


class Recorder extends Component {
constructor(props) {
  super(props)

  this.state = {
    record: false,
    playing: false
  }
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

  var sound = new Pizzicato.Sound({
    source: 'file',
    options: { path: [recordedBlob.blobURL] }
  }, () => {
    this.props.addRecording(sound)
  });
}

listenBeforeSave = () => {
  this.props.currentRecording.play()
  this.setState({
    playing: !this.state.playing
  })
}

handleClear = () => {
  this.props.clearRecording()
}

saveRecording = () => {
  this.props.satisfiedWithRecording()
}

  render() {
    return(
      <Fade in>
      <div className='outer-div'>
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
          {this.props.currentRecording === undefined ? <Button
            className='Recording'
            onClick={this.handleRecording}
            variant="fab"
            color="primary"
            aria-label="add"
            mini>
           {this.state.record ?
             <Stop /> :
             <FiberManualRecord color="error"
           />}</Button> :
             <div>
               <Button
                 className='Play'
                 onDoubleClick={this.listenBeforeSave}
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
      </Fade>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentRecording: state.currentRecording,
    recording: state.recording
  }
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
      console.log('is it deleting immediately?');
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recorder);
