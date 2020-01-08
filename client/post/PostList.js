import React, {Component} from 'react'
import Post from './Post'

class PostList extends Component {
  render() {
    return (

      
      <div style={{marginTop: '24px'}}>
        
        {this.props.posts.map((item, i) => {
            return <Post post={item} key={i} onRemove={this.props.removeUpdate}/>
          })
        }
      </div>
    )
  }
}

export default PostList
