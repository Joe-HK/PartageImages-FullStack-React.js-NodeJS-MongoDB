import React, {Component} from 'react'
import {withStyles} from 'material-ui/styles'
import Card, {CardContent, CardMedia} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import wImage from './../assets/images/paysage.jpg'
import Grid from 'material-ui/Grid'
import auth from '../auth/auth-helper'
import FindUsers from '../user/FindUsers'
import WallPosts from '../post/WallPosts'


class Home extends Component {
  state = {
    defaultPage: true
  }
  init = () => {
    if(auth.isAuthenticated()){
      this.setState({defaultPage: false})
    }else{
      this.setState({defaultPage: true})
    }
  }
  componentWillReceiveProps = () => {
    this.init()
  }
  componentDidMount = () => {
    this.init()
  }
  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        {/* condition auth ou pas  */}
        {this.state.defaultPage &&
         
         
         <Grid container spacing={24}>
      <Grid item xs={12}>
              
              <Card className={classes.card}>
               
               
                <Typography type="headline" component="h2" className={classes.title}>
                  Page Principale
               
                </Typography>
                <CardMedia className={classes.media} image={wImage} title="Image"/>
                <CardContent>
                  <Typography type="body1" component="p">
                   Projet Middelware 
                  </Typography>
               </CardContent>
              </Card>
            </Grid>
          </Grid>
        }
        {
        //sinon
        !this.state.defaultPage &&
          <Grid container spacing={24}>
            <Grid item xs={8} sm={7}>
              
              {/*chargment des post + affichage*/}
              <WallPosts/>
            </Grid>
            <Grid item xs={6} sm={5}>

             {/*chargment des users + affichage*/}

              <FindUsers/>
            </Grid>
          </Grid>
        }
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    maxWidth: 600,
  
    margin: 'auto',
    marginTop: theme.spacing.unit * 5
  },
  
  title: {
    padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
})

export default withStyles(styles)(Home)
