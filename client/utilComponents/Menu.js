import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui-icons/Home'
import Button from 'material-ui/Button'
import auth from '../auth/auth-helper'
import {Link, withRouter} from 'react-router-dom'

const isActive = (history, path) => {
  if (history.location.pathname == path){
    
    return {color: '#ffa726'}
  }
  else{
    return {color: '#ffffff'}

  }
}

//de material ui 
const Menu = withRouter(({history}) => (
  <AppBar position="static">
    <Toolbar>
      <Typography type="title" color="inherit">
              Projet Middelware     
              
     </Typography>
      <Link to="/">
        <IconButton aria-label="Home" style={isActive(history, "/")}>
        
          <HomeIcon/>
        </IconButton>

      </Link>
      {
        !auth.isAuthenticated() && (<span>
          <Link to="/signup">
         
            <Button style={isActive(history, "/signup")}>Inscription
            </Button>
          
          </Link>
          <Link to="/signin">
        
            <Button style={isActive(history, "/signin")}>Connexion
            </Button>
          </Link>
        </span>)
      }
      
      {
        auth.isAuthenticated() && (<span>
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>Profile</Button>
          </Link>
      
          <Button color="inherit" onClick={() => {
              
              auth.signout(() => history.push('/'))
            }}>Se déconnecter</Button>
        </span>)
      }
    </Toolbar>  
  </AppBar>
))

export default Menu
