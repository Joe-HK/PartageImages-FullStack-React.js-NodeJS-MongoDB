import React, {Component} from 'react'
import auth from './../auth/auth-helper'
import { CardHeader } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import DeleteIcon from 'material-ui-icons/Delete'
import {withStyles} from 'material-ui/styles'
import {comment, uncomment} from './api-post.js'
import {Link} from 'react-router-dom'
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';

import AddCommentIcon from '@material-ui/icons/AddComment';



class Comments extends Component {
 
 
  state = {text: ''}
 
 
  handleChange = name => event => {

    this.setState({[name]: event.target.value})
  }
 

  
 
  addComment = (event) => {

    const val=event.target.value.trim()

    //entrer sans boutton
    if(event.keyCode == 13 && val){
      event.preventDefault()
     
      const jwt = auth.isAuthenticated()
      comment(
        
      {
        userId: jwt.user._id
      }, 
      
      {
        t: jwt.token
      }, 
      
      this.props.postId, {text: this.state.text}).then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          this.setState({text: ''})
          this.props.updateComments(data.comments)
        }
      })
    }
  }

  deleteComment = comment => event => {
    const jwt = auth.isAuthenticated()
    uncomment({

      userId: jwt.user._id

    }, 
    {
      t: jwt.token

    }, this.props.postId, comment).then((data) => {
      if (data.error) 
      {

        console.log(data.error)
      } else {
        this.props.updateComments(data.comments)
      }
    })
  }
  render() {
    const {classes} = this.props
    const commentBody = item => {
      return (
        <p className={classes.commentText}>
          <Link to={"/user/" + item.postedBy._id}>{item.postedBy.name}</Link><br/>
          {item.text}

          <span className={classes.commentDate}>
          

            {(new Date(item.created).
          
          toLocaleDateString('fr-FR',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:'numeric', minute:'numeric' }))} {' '}
          
            {auth.isAuthenticated().user._id === item.postedBy._id &&
              <DeleteIcon onClick={this.deleteComment(item)} className={classes.commentDelete}>supprimer</DeleteIcon> }
          </span>
        </p>
      )
    }

    return (<div>
        <CardHeader
              avatar={


                <AddCommentIcon style=
                {{color :'#63747A', 
                   width: 28,
                   height: 28 
                   }}/>
                 
                     
              }
              title={ <TextField
                onKeyDown={this.addComment}
                multiline
                
                value={this.state.text}
                onChange={this.handleChange('text')}
              
                placeholder="Ecrire un commentaire ..."
                className={classes.commentField}
                margin="normal"
                />}
              className={classes.cardHeader}
        />
        { this.props.comments.map((item, i) => {
            return <CardHeader
                      avatar={
                        <SpeakerNotesIcon style=
                        {{
                           width: 25,
                           height: 25,
                           color :'#63747A' 
                           }} />
                      }
                      title={commentBody(item)}
                      className={classes.cardHeader}
                      key={i}/>
              })
        }
    </div>)
  }
}


const styles = theme => ({
  cardHeader: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  
  commentField: {
    width: '96%'
  },
  commentText: {
    backgroundColor: 'white',
 
    padding: theme.spacing.unit,
    margin: `2px ${theme.spacing.unit*2}px 2px 2px`
  },
  commentDate: {
    display: 'block',
    
    color: 'gray',
    fontSize: '0.8em'
 },
 commentDelete: {
   fontSize: '1.6em',
   verticalAlign: 'middle',
   cursor: 'pointer'
 }
})


export default withStyles(styles)(Comments)
