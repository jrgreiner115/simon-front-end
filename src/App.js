import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Typography, TextField, Button} from '@material-ui/core/';
import {connect} from 'react-redux'
import Login from "./Components/Login";


class App extends Component {

  handleChange = (event) => {

    this.setState({
      [event.target.name]: event.target.value
    })
  }



  render() {
    return (
      <div className="App">
        <Login />
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
