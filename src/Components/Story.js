import React, {Component} from 'react';
import {Paper, Typography, Button, Fade} from '@material-ui/core/';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import NormalCharacter from './Character/NormalCharacter'
import Adapter from '../services/adapter.js'

class StoryBook extends Component {

  state = {
    fade: true
  }

  handleClick = () => {
    this.setState({
      fade: false
    }, () => {
      setTimeout(() =>
      this.props.history.push('/record'), 800)
    })
  }

  componentDidMount = () => {
    let userId = localStorage.getItem("id")
    Adapter.getRecs(userId).then((json) =>{ this.props.getRecs(json.recordings)})
  }


  render() {
    return (
      <div
        class='outer-div'>
        <Fade in={this.state.fade}>
        <Paper
          style={{
          borderRadius: '40px',}}
          className='Story-Paper'>
          <Typography size='13' variant="display1">This is Simon!</Typography>
          <NormalCharacter />
          <Typography variant="subheading">Simon loves to Dance. Let's record some music to to give him something to dance to!</Typography>
          <br />
          <Button onClick={this.handleClick} color='primary' variant='extendedFab'>Let's do it!</Button>
        </Paper>
        </Fade>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRecs: (array) => {
      dispatch({
        type: "GET_RECORDINGS",
        payload: array
      })
    },
  }
}




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StoryBook));
