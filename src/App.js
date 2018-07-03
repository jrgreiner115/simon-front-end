import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux'
import Recorder from './Components/Recorder'
import LoginAndRegisterContainer from './Containers/LoginAndRegisterContainer'
import {BrowserRouter as Router, Route, Switch, Link, Redirect, withRouter} from 'react-router-dom';
import { routeActions } from 'react-router-redux';
import Edit from './Components/Edit'
import TemporaryDrawer from './Containers/Menu'





class App extends Component {






  render() {
    const routes = [
      <Route path='/record' render={() => <Recorder />} />,
      <Route path='/edit'
      render={() => <Edit />} />
    ]

    const preauth = [<Route path='/login' component={LoginAndRegisterContainer} />]

    return (
      <div className="App">
         { localStorage.getItem("token") ? <TemporaryDrawer /> : ""}
          <Switch props={this.props.history}>
            { localStorage.getItem("token") ? routes : preauth}
            <Route path='/' component={LoginAndRegisterContainer} />
          </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRecording: (recording) => {
      dispatch({
        type: "GET_RECORDINGS",
        payload: recording
      })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
