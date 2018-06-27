import React, {Component} from 'react';
import Pizzicato from 'pizzicato';
import {ReactMic} from 'react-mic';
import {Paper, Typography, TextField, Button, Icon} from '@material-ui/core/';
import {FiberManualRecord, Stop} from '@material-ui/icons/'

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

   onStop(recordedBlob) {
  console.log('recordedBlob is: ', recordedBlob);
  var voice = new Pizzicato.Sound({
      source: recordedBlob,
      options: {volume: 0.8}
    }, () => voice.play())
}

render() {
  return(
    <Paper className='Main-Paper'>
      <h5>Here's the recorder.</h5>
      <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          strokeColor="#a174ad"
           />
      <Button onClick={this.handleRecording} variant="fab" color="primary" aria-label="add" mini>
        {this.state.record ? <Stop />:<FiberManualRecord color="error" />}</Button>
    </Paper>
  )
}




}

export default Recorder
