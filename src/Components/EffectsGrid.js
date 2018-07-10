import React, {Component} from 'react';
import {Typography,Button, Fade, Grid, Card, CardActions, CardContent} from '@material-ui/core/';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

class EffectsGrid extends Component {


handleEditButton = (name) => {
  this.props.setFocus(name)
}



  render() {
    let effects = [];
    for (var effect in this.props.mainReducer.effects) {
      effects.push(this.props.mainReducer.effects[effect]);
    }
    return (
      <div>
        <Grid container justify='center' alignContent='center' id='effects-grid' spacing={32}>
          {effects.map(effect =>
            effect.active ?
            <Fade in>
            <Grid key={effect.name} item xs={2}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {effect.name}
                </Typography>
              </CardContent>
              <CardActions id='effects-grid'>
                <Button size="small" color="primary"onClick={(name) => this.handleEditButton(effect.name)}>
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Fade>
          :
          null
          )}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFocus: (name) => {
      dispatch({
        type: "SET_INFOCUS_EFFECT",
        payload: name
      })
    },
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EffectsGrid));
