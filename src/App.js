import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux'
import Recorder from './Components/Recorder'
import LoginAndRegisterContainer from './Containers/LoginAndRegisterContainer'
import {Route, Switch, withRouter} from 'react-router-dom';
// import { routeActions } from 'react-router-redux';
import Edit from './Components/Edit'
import TemporaryDrawer from './Containers/Menu'
import StoryBook from './Components/Story'

class App extends Component {

  render() {
    const routes = [
      <Route path='/record' render={() => <Recorder />} />,
      <Route path='/edit'
      render={() => <Edit />} />,
      <Route path='/start'
      render={() => <StoryBook />} />
    ]

    const preauth = [<Route path='/login' component={LoginAndRegisterContainer} />]

    return (
      <div className="App">
         { localStorage.getItem("token") ? <TemporaryDrawer /> : ""}
          <Switch props={this.props.history}>
            { localStorage.getItem("token") && localStorage.getItem("token") !== "undefined"  ? routes : preauth}
            { localStorage.getItem("token") ? <Route path='/'
            render={() => <StoryBook />} /> : <Route path='/' component={LoginAndRegisterContainer} />}
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
