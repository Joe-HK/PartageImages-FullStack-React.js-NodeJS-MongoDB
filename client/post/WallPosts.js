import React, {Component} from 'react'
import {withStyles} from 'material-ui/styles'
import Card from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import auth from '../auth/auth-helper'
import PostList from './PostList'
import {listOfPosts} from './api-post.js'
import NewPost from './NewPost'


class Newsfeed extends Component {
  state = {
      posts: []
  }
  loadPosts = () => {
    const jwt = auth.isAuthenticated()

    listOfPosts({
      userId: jwt.user._id
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

  //préchargement
  componentDidMount = () => {
    this.loadPosts()
  }
  /*
  mise à jour de la list de posts avec cette 
  fonction fournie en callback  à l'element NewPost
  */
  addPost = (post) => {
    const updatedPosts = this.state.posts
    updatedPosts.unshift(post)//insert un element en premier p dans un tableau
    this.setState({posts: updatedPosts})
  }
  removePost = (post) => {
    
    const updatedPosts = this.state.posts
    
    const index = updatedPosts.indexOf(post)
    
    updatedPosts.splice(index, 1)
    
    
    this.setState({posts: updatedPosts})
  }
  render() {
    const {classes} = this.props
    return (
      <Card className={classes.card}>
        <Typography type="title" className={classes.title}>
       
          Les postes d'images
        </Typography>
        <Divider/>
    
        <NewPost addUpdate={this.addPost}/>
       
        <Divider/>
        <PostList removeUpdate={this.removePost} posts={this.state.posts}/>
      </Card>
    )
  }
}

const styles = theme => ({
  card: {
    margin: 'auto',
  
    paddingTop: 0,
    paddingBottom: theme.spacing.unit*3
  },

  title: {
    padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`,
   
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  media: {
    minHeight: 330
  }
})

export default withStyles(styles)(Newsfeed)
