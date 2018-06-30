import React, {Component} from 'react';
import {Typography,Button, Fade, Grid, Card, CardMedia, CardActions, CardContent} from '@material-ui/core/';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

class EffectsGrid extends Component {
constructor(props) {
  super(props)

}

componentDidMount() {

}



  render() {
    let effects = [];
    for (var effect in this.props.mainReducer.effects) {
      effects.push(this.props.mainReducer.effects[effect]);
    }
    return (
      <div>
        <Fade in>
        <Grid container justify='center' alignContent='center' id='effects-grid' spacing={32}>
          {effects.map(effect =>
            effect.active ?
            <Grid key={effect.name} item xs={2}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {effect.name}
                </Typography>
              </CardContent>
              <CardActions id='effects-grid'>
                <Button size="small" color="primary">
                  Edit
                </Button>
                <Button size="small" color="primary">
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid> :
          null
          )}
        </Grid>
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
    addRecording: (recording) => {
      dispatch({
        type: "ADD_RECORDING",
        payload: recording
      })
    },
    clearRecording: (recording) => {
      console.log('is it deleting immediately?');
      dispatch({
        type: "CLEAR_RECORDING",
        payload: recording
      })
    },
    satisfiedWithRecording: (recording) => {
      dispatch({
        type: "SATISFIED_WITH_RECORDING",
        payload: recording
      })
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EffectsGrid));
