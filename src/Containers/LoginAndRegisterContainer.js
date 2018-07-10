import React, { Component } from 'react';
import {connect} from 'react-redux'
import Login from "../Components/Login";
import Register from '../Components/Register';
import Logo from '../Components/Character/simon-logo.png'
import {Typography} from '@material-ui/core/'

class LoginAndRegisterContainer extends Component {
  state = {
    loginScreen: true
  }

  swapToRegister = () => {
    this.setState({
      loginScreen: !this.state.loginScreen
    })
  }

  render(){
    return (
      <React.Fragment>
          <div className='logo'>
            <img alt='logo' src={Logo} height='170px' />
            <Typography gutterBottom variant='subheading'>A Simple Audio Workstation</Typography>
          </div>
        {this.state.loginScreen ?
          <Login swapToRegister={this.swapToRegister}/> :
          <Register swapToRegister={this.swapToRegister}/>}
      </React.Fragment>
    );
  }
}

export default connect(null, null)(LoginAndRegisterContainer)
