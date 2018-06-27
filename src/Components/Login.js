import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Paper, Typography, TextField, Button} from '@material-ui/core/';

class Login extends Component {
  state= {
    username: "",
    password: "",
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = (event) => {
    console.log("I submitted!");
  }

  handleClick = (event) => {
    this.props.swapToRegister()
  }


  render() {
    return (<div className='outer-div'>
      <Paper  className='Input-Paper'elevation={1}>
        <form>
          <TextField
          id="name"
          label="username"
          name="username"
          value={this.state.name}
          onChange={this.handleChange}
          margin="normal"
          /><br />
          <TextField
          id="password-input"
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
    </div>)
  }
}

export default Login
