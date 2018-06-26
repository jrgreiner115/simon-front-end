import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Typography, TextField, Button} from '@material-ui/core/';
import Login from "./Components/Login"

class App extends Component {
  state= {
    name: "",
    password: "",
  }

  handleChange = (event) => {

    this.setState({
      [event.target.name]: event.target.value
    })
  }



  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Login />
      </div>
    );
  }
}

export default App;
