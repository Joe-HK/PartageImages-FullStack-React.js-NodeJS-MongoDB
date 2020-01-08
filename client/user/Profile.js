import React, {Component} from 'react'
import {withStyles} from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import List, {ListItem, ListItemText} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'
import PostList from './../post/PostList'
import {listOfPosts} from './../post/api-post.js'


class Profile extends Component {
 
  constructor({match}) {
    super()
    this.state = {
      redirectToSignin: false,
      posts: [],
      user: {},
    }
    this.match = match
  }

  init = (userId) => {

    const jwt = auth.isAuthenticated()
    read({
      userId: userId
    }, 
    
    {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({redirectToSignin: true})
      } else {
        this.setState({user: data})
       
        this.loadPosts(data._id)
      }


    })
  }
  componentWillReceiveProps = (props) => {
    this.init(props.match.params.userId)
  }


  componentDidMount = () => {
    this.init(this.match.params.userId)
  }


  loadPosts = (user) => {
    const jwt = auth.isAuthenticated()
    
    listOfPosts({
      userId: user
    }, {
      t: jwt.token

    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({posts: data})
      }
    })
  }
  removePost = (post) => {

    const updatedPosts = this.state.posts
    const index = updatedPosts.indexOf(post)
    updatedPosts.splice(index, 1)
    this.setState({posts: updatedPosts})
  }
  render() {

    const {classes} = this.props
    const redirectToSignin = this.state.redirectToSignin
    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Profile
        </Typography>

        <List >
          <ListItem>
    
            <Avatar 
                style={{backgroundColor:this.state.user.avatarColor? this.state.user.avatarColor:'orange',}}>
                  {this.state.user.name? this.state.user.name.at(0).toUpperCase() :''}
         </Avatar>

            <ListItemText primary={this.state.user.name} secondary={this.state.user.email}/> 
          </ListItem>
          <Divider/>
         
        </List>
        <PostList removeUpdate={this.removePost} posts={this.state.posts}/>
      </Paper>
    )
  }
}

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px 0`,
    color: theme.palette.protectedTitle,
    fontSize: '1em'
  }
})

export default withStyles(styles)(Profile)
