import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Typography, TextField, Button} from '@material-ui/core/';
import {connect} from 'react-redux'
import Login from "./Components/Login";
import Recorder from './Components/Recorder'
import Register from './Components/Register'

class App extends Component {

state = {
  loginScreen: true
}

swapToRegister = () => {
  this.setState({
    loginScreen: !this.state.loginScreen
  })
}
  render() {
    return (
      <div className="App">'
        <Recorder />
        {this.state.loginScreen ?
          <Login swapToRegister={this.swapToRegister}/> :
          <Register swapToRegister={this.swapToRegister}/>}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recording: state.recording,
    effects: state.effects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
