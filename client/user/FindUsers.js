import React, {Component} from 'react'
import {withStyles} from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import List, {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import {Link} from 'react-router-dom'
import {findPeople } from './api-user.js'
import auth from '../auth/auth-helper'
import ViewIcon from 'material-ui-icons/Visibility'



class FindPeople extends Component {
  state = {
      users: [],
      open: false
  }
  componentDidMount = () => {
    const jwt = auth.isAuthenticated()
    findPeople({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({users: data})
      }
    })
  }
  
  handleRequestClose = (event, reason) => {
    this.setState({ open: false })
  }
  render() {
    const {classes} = this.props
    return (<div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Liste d'utilisateurs
        </Typography>
        <List>
          {this.state.users.map((item, i) => {
              return <span key={i}>
                <ListItem>
                  
                      <Avatar style={{backgroundColor:item.avatarColor}}>
                      {item.name.at(0).toUpperCase()}
                      </Avatar>

                  <ListItemText primary={item.name}/>
                  <ListItemSecondaryAction className={classes.users}>

                    <Link to={"/user/" + item._id}>
                      <IconButton variant="raised" color="secondary" className={classes.viewButton}>
                        <ViewIcon/>
                      </IconButton>
                    </Link>
                    
                  </ListItemSecondaryAction>
                </ListItem>
              </span>
            })
          }
        </List>
      </Paper>
     
    </div>)
  }
}


const styles = theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing.unit,
    margin: 0
  }),
  title: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  avatar: {
    marginRight: theme.spacing.unit * 1
  },

  users: {
    right: theme.spacing.unit * 2
  },

  viewButton: {
    verticalAlign: 'middle'
  }
})
export default withStyles(styles)(FindPeople)
