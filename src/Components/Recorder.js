import React, {Component} from 'react';
import Pizzicato from 'pizzicato';
import {ReactMic} from 'react-mic';
import {ReactMicPlus} from 'react-mic-plus'
import {Paper, Typography, TextField, Button, Icon} from '@material-ui/core/';
import {FiberManualRecord, Stop} from '@material-ui/icons/'
var lamejs = require("lamejs");

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

  var sound = new Pizzicato.Sound({
    source: 'file',
    options: { path: [recordedBlob.blobURL] }
  }, function() {
    console.log('sound file loaded!')
    sound.play();
  });


    // fetch('http://localhost:3500/api/v1/users', {
    //   method: "POST",
    //   headers:
    // }
  // var file = {};
  // var xhr = new XMLHttpRequest();
  // xhr.open('GET', recordedBlob.blobURL, true);
  // xhr.responseType = 'blob';
  // xhr.onload = function(e) {
  //   if (this.status == 200) {
  //       file.file = this.response;
  //       file.name = "whatever_filename.mp3";
  //       file.type = "audio/mp3";
  //     }
  //     console.log(file);
  //   }
  // var reader = new FileReader();
  //         reader.onload = function(event) {
  //           var fd = {};
  //           fd["fname"] = "test.wav";
  //           fd["data"] = event.target.result;
  //           callback(fd);
  //         };
  //         reader.readAsDataURL(recordedBlob);
  //         console.log("read blob is", reader);
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
        <Button className='Recording' onClick={this.handleRecording} variant="fab" color="primary" aria-label="add" mini>
          {this.state.record ? <Stop />:<FiberManualRecord color="error" />}</Button>
      </Paper>
    )
  }
}

export default Recorder
