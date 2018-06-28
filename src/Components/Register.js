import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Paper, Typography, TextField, Button, Fade} from '@material-ui/core/';

class Register extends Component {
  state= {
    name: "",
    username: "",
    invalidPassword: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = (event) => {
    console.log("I submitted!");
  }

  handleValidation = (event) => {
    const pass = document.getElementById('password-input')
    event.target.value !== pass.value ?
    this.setState({
      invalidPassword: true
    }) :
    this.setState({
      invalidPassword: false
    })
  }

  handleClick = (event) => {
    this.props.swapToRegister()
  }

  render() {
    return (<div className='outer-div'>
      <Fade in>
      <Paper  className='Input-Paper'elevation={2}>
        <form>
          <TextField
          id="name"
          label="name"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          margin="normal"
          /><br />
          <TextField
          id="username"
          label="username"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
          margin="normal"
          /><br />
          <TextField
          id="password-input"
          label="password"
          type="password"
          name="password"
          // value={this.state.password}
          // onChange={this.handleChange}
          margin="normal"
          /><br />
          <TextField
          id="password-input-confirmation"
          label="confirm password"
          type="password"
          name="confirmPassword"
          // value={this.state.confirmPassword}
          onChange={this.handleValidation}
          error={this.state.invalidPassword}
          margin="normal"
          />
          <br /><br />
          <Button
            disabled= {this.state.invalidPassword}
            variant='contained'
            color='primary'
            onClick={this.handleSubmit}>
            Sign Up
          </Button>

      </form>
      <br />
      <a onClick={this.handleClick}><Typography variant="caption">Already have an Account? Click to Log in</Typography></a>
      </Paper>
      </Fade>
    </div>)
  }
}

export default Register
