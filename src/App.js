import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Typography, TextField, Button} from '@material-ui/core/';
import {connect} from 'react-redux'
import Login from "./Components/Login";
import Recorder from './Components/Recorder'
import Register from './Components/Register'
import LoginAndRegisterContainer from './Containers/LoginAndRegisterContainer'
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';

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
      <div className="App">
        <p> {this.props.isRecorded ? "RECORDED" : "NOT RECORDED"} </p>
        {/* <Router>
          <Switch>
            <Route path='/' component={LoginAndRegisterContainer} />
            <Route path='/login' component={Recorder} />
          </Switch>
        </Router> */}
        <Recorder />
        {/*
        {localStorage.token && localStorage.id !== 'undefined' ? <Recorder /> : <LoginAndRegisterContainer />} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recording: state.recording,
    effects: state.effects,
    authorizedUser: state.authorizedUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRecording: (recording) => {
      dispatch({
        type: "GET_RECORDINGS",
        payload: recording
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
