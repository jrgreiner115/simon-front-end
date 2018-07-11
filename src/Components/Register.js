import React, {Component} from 'react';
import {Paper, Typography, TextField, Button, Fade} from '@material-ui/core/';
import Adapter from '../services/adapter';
import {connect} from 'react-redux';

class Register extends Component {
  state= {
    name: "",
    username: "",
    invalidPassword: false,
    input: true
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = (event) => {
    console.log("I submitted!");
    const pass = document.getElementById('password-input')
    let userObj = {name: this.state.name, username: this.state.username, password: pass.value}
    Adapter.postUsers(userObj).then(() => this.props.swapToRegister())
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
      <Fade in={this.state.input}>
      <Paper  style={{
        borderRadius: '40px',
      }} className='Input-Paper'elevation={2}>
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

const mapStateToProps = (state) => {
  return {
    recording: state.recording,
    effects: state.effects,
    authorizedUser: state.authorizedUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authUser: (token) => {
      dispatch({
        type: "AUTH_USER",
        payload: ""
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register)
