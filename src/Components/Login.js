import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Paper, Typography, TextField, Button} from '@material-ui/core/';

class Login extends Component {
  state= {
    name: "",
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

  render() {
    return (<div className='outer-div'>
      <Paper  className='Input-Paper'elevation={1}>
        <form>
          <TextField
          id="name"
          label="username"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          margin="normal"
          /><br />
          <TextField
          id="password-input"
          label="password"
          type="password"
          name="password"
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
      </Paper>
    </div>)
  }
}

export default Login
