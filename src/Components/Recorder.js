import React, {Component} from 'react';
import Pizzicato from 'pizzicato';
import {ReactMic} from 'react-mic';
import {ReactMicPlus} from 'react-mic-plus'
import {Paper, Typography, TextField, Button, Icon} from '@material-ui/core/';
import {connect} from 'react-redux';
import {FiberManualRecord, Stop} from '@material-ui/icons/';


class Recorder extends Component {
constructor(props) {
  super(props)

  this.state = {
    record: false
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
  console.log('recordedBlob is: ', recordedBlob);

  var sound = new Pizzicato.Sound({
    source: 'file',
    options: { path: [recordedBlob.blobURL] }
  }, () => {
    console.log('sound file loaded!')
    this.props.addRecording(sound)
  });
}


  render() {
    return(
      <Paper className='Main-Paper'>
        <h5>Here's the recorder.</h5>
       <ReactMicPlus
           record={this.state.record}         // defaults -> false.  Set to true to begin recording
           // provide css class name
           onStop={this.onStop}        // callback to execute when audio stops recording
           strokeColor='#a174ad'     // sound wave color
           backgroundColor='#fff' // background color
           nonstop="true"		   // nonstop specrogram
           duration={10}	   // duration of spectrogram on the screen (seconds)
       />
       {this.props.currentRecording === "" ?
          "" :
          <Button
            className='Play'
            onClick={() => this.props.currentRecording.play()}
            variant="fab"
            color="primary"
            aria-label="add" mini>
             {this.state.record ? <Stop />:<FiberManualRecord color="error" />}
           </Button>}

         <Button
           className='Recording'
           onClick={this.handleRecording}
           variant="fab"
           color="primary"
           aria-label="add"
           mini>
          {this.state.record ?
            <Stop /> :
            <FiberManualRecord color="error"
          />}
        </Button>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recorder);
