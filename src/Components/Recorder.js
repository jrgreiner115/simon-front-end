import React, {Component} from 'react';
import Pizzicato from 'pizzicato';
import {ReactMic} from 'react-mic';
import {Paper, Typography, Button, Fade} from '@material-ui/core/';
import {connect} from 'react-redux';
import {FiberManualRecord, Stop, PlayArrow, Save, Delete} from '@material-ui/icons/';
import { withRouter } from 'react-router-dom';

const styles = {
  textColor: {
    color: 'white'
  },
};

class Recorder extends Component {
constructor(props) {
  super(props)

  this.state = {
    record: false,
    fade: true
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
  console.log(recordedBlob);
  var sound = new Pizzicato.Sound({
    source: 'file',
    options: { path: [recordedBlob.blobURL] }
  }, () => {
    this.props.addRecording(sound)
  });
}

listenBeforeSave = () => {
  return (
  this.props.mainReducer.currentRecording.play())
  console.log("did it listen? ");
}

handleClear = () => {
  this.props.clearRecording()
}

saveRecording = () => {
  this.setState({
    fade: false
  })
  this.props.satisfiedWithRecording()
  setTimeout(() =>
  this.props.history.push('/edit'), 500);

}

  render() {
    return(
      <Fade in={this.state.fade}>
      <div className='outer-div'>
      <Typography align="center" gutterBottom variant="display1">This is Simon. Record below to get started</Typography>
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
             <FiberManualRecord color="error"
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
      </Fade>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recorder));
