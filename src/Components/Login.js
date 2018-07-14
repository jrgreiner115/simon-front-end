import React, {Component} from 'react';
import {Paper, Typography, TextField, Button, Fade} from '@material-ui/core/';
import Adapter from '../services/adapter';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  state= {
    username: "",
    input: true,
    errors: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = (event) => {
    const pass = document.getElementById('password-input-login')
    let userObj = {username: this.state.username, password: pass.value}
    Adapter.login(userObj).then(() => {
      if (localStorage.getItem("token") === "undefined") {
        this.setState({
          errors: true
        })
        }
        else {
          this.props.authUser()
          this.setState({
            input: false
          })
          setTimeout(() => this.props.history.push('/start'), 500);
        }}
      )
  }

  handleClick = (event) => {
    this.props.swapToRegister()
  }


  render() {
    return (<div className='outer-div'>
      <Fade in={this.state.input}>
      <Paper  style={{
        borderRadius: '40px',
      }} className='Input-Paper'elevation={1}>
        <form >
          <TextField
            error={this.state.errors}
          id="name"
          label="username"
          name="username"
          value={this.state.name}
          onChange={this.handleChange}
          margin="normal"
          /><br />
          <TextField
            error={this.state.errors}
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
            variant='extendedFab'
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
  return state
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
