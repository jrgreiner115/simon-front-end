import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Paper, Typography, TextField, Button, Fade} from '@material-ui/core/';
import Adapter from '../services/adapter';
import {connect} from 'react-redux';

class Login extends Component {
  state= {
    username: "",
    input: true,
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = (event) => {
    console.log("I submitted!");
    const pass = document.getElementById('password-input-login')
    let userObj = {username: this.state.username, password: pass.value}
    Adapter.login(userObj).then(() => {
      console.log('made it here');
      this.props.authUser()})

    this.setState({
      input: false
    })

  }

  handleClick = (event) => {
    this.props.swapToRegister()
  }


  render() {
    console.log("PROPS", this.props);
    return (<div className='outer-div'>
      <Fade in={this.state.input}>
      <Paper  className='Input-Paper'elevation={1}>
        <form >
          <TextField
          id="name"
          label="username"
          name="username"
          value={this.state.name}
          onChange={this.handleChange}
          margin="normal"
          /><br />
          <TextField
          id="password-input-login"
          label="password"
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
          margin="normal"
          />
          <br /><br />
          <Button
            variant='contained'
            color='primary'
            onClick={this.handleSubmit}>
            Log in
          </Button>

      </form>
      <br />
        <a onClick={this.handleClick}><Typography variant="caption">Don't Have an Account? Create one here</Typography></a>
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
    authUser: () => {
      dispatch({
        type: "AUTH_USER",
        payload: ""
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
