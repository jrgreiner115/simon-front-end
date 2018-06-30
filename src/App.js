import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Typography, TextField, Button} from '@material-ui/core/';
import {connect} from 'react-redux'
import Login from "./Components/Login";
import Recorder from './Components/Recorder'
import Register from './Components/Register'
import MainApplication from './Containers/MainApplication'
import LoginAndRegisterContainer from './Containers/LoginAndRegisterContainer'
import {BrowserRouter as Router, Route, Switch, Link, Redirect, withRouter} from 'react-router-dom';
import { routeActions } from 'react-router-redux';
import Edit from './Components/Edit'





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
        <p> This is where I'll put some sort of Nav bar, after auth. Recorded? {this.props.isRecorded ? "RECORDED" : "NOT RECORDED"} </p>
          <Switch props={this.props.history}>
            <Route path='/login' component={LoginAndRegisterContainer} />
            <Route path='/record' render={() => <Recorder />} />
            <Route path='/edit'
            render={() => <Edit />} />
          </Switch>
        {/*
        {localStorage.token && localStorage.id !== 'undefined' ? <Recorder /> : <LoginAndRegisterContainer />} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
