import Post from '../../db/models/ImageDetails';

import errorHandler from "../../helpers/dbErrorHelper";

const like = (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, 

      {$push: {likes: req.body.userId}}, {new: true})

    .exec((err, result) => {

      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(result)
    })
  }

  export default {like}