import React, { Component } from 'react';
import {connect} from 'react-redux'
import Recorder from '../Components/Recorder';

class MainApplication extends Component {
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
        {localStorage.recordings.value === undefined ? <Recorder /> : <p>"We have recordings!"</p>}
      </React.Fragment>
    );
  }
}

export default connect(null, null)(MainApplication)
