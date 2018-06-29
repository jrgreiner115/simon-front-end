import React, {Component} from 'react';
import Pizzicato from 'pizzicato';
import {ReactMic} from 'react-mic';
import {Paper, Typography, TextField, Button, Icon} from '@material-ui/core/';
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

  render() {
    console.log(this.props);
    return(
      <Paper className='Main-Paper'>
        <h5>Here's the recorder.</h5>
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
                 onClick={console.log("Save")}
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recorder);
