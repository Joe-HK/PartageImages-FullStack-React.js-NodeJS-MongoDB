

import Post from '../../db/models/ImageDetails';

import errorHandler from "../../helpers/dbErrorHelper";

const wallList = (req, res) => {
    
    Post.find({ postedBy: req.profile._id})
   // .populate('comments', 'text created')
    .populate('comments.postedBy', '_id name')
  //  avatarColor
    .populate('postedBy', '_id name')
    .sort('-created')
    .exec((err, posts) => {


      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }

     
      
    
      res.json(posts)
    })
  }
  
  export default {wallList}