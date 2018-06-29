import React, { Component } from 'react';
import {connect} from 'react-redux'
import Login from "../Components/Login";
import Register from '../Components/Register';

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
        {this.state.loginScreen ?
          <Login swapToRegister={this.swapToRegister}/> :
          <Register swapToRegister={this.swapToRegister}/>}
      </React.Fragment>
    );
  }
}

export default connect(null, null)(LoginAndRegisterContainer)
