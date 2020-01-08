import React, {Component} from 'react'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import {withStyles} from 'material-ui/styles'

import auth from './../auth/auth-helper'
import {Redirect} from 'react-router-dom'
import {signin} from './api-auth.js'


class Signin extends Component {
  
  //intialisation de l'état du composant 
  state = {
      email: '',
      password: '',
  
      error: '',
      redirection: false
  }

  clickSubmit = () => {
    const user = {
   
      email: this.state.email || undefined,
      
      password: this.state.password || undefined
    }

    signin(user).then((data) => {
      if (data.error) {
      
        this.setState({error: data.error})
      } else {
    
        auth.authenticate(data, () => {
          this.setState({redirection: true})
        })
      }
    })
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  render() {
    const {classes} = this.props
    
    const {from} = this.props.location.state || {
      from: {
        pathname: '/'
      }
    }
    const {redirection} = this.state
    if (redirection) {
      return (<Redirect to={from}/>)
    }

    
    return (
      
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
          </Typography>
          <TextField id="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange('email')} margin="normal"/><br/>
          
        <TextField id="password" type="password" label="Mot de passe" className={classes.textField} value={this.state.password} onChange={this.handleChange('password')} margin="normal"/>
          <br/> {
            this.state.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>erreur</Icon>

              {this.state.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
    )
  }
}

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },

  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  }
})


export default withStyles(styles)(Signin)
