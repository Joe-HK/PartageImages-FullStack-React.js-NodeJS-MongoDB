

import Post from '../../db/models/ImageDetails';

import errorHandler from "../../helpers/dbErrorHelper";

//utlisation du router param
const comment = (req, res) => {

    let comment = req.body.comment

    comment.postedBy = req.body.userId
    
    Post.findByIdAndUpdate(req.body.postId, {$push: {comments: comment}}, {new: true})
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(result)
    })
  }

  export default {comment}