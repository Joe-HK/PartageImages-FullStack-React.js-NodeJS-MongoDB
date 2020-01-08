
import Post from '../../db/models/ImageDetails';
import errorHandler from "../../helpers/dbErrorHelper";



const uncomment = (req, res) => {
    let comment = req.body.comment
    Post.findByIdAndUpdate(req.body.postId, {$pull: {comments: {_id: comment._id}}}, {new: true})
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

  export default {uncomment}