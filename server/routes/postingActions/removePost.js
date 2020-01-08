

import Post from '../../db/models/ImageDetails';
import fs from 'fs'
const CURRENT_WORKING_DIR = process.cwd();
const imagesPath = CURRENT_WORKING_DIR + '\\public\\';


import errorHandler from "../../helpers/dbErrorHelper";

const remove = (req, res) => {

  const id = req.params.postId;

  Post.findById(id, function (err, post) {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    //si lepost contient une image 
    if (post.imageURL !== undefined) {
      const imageId = post.imageURL.match(/[-\w.]+$/);

      try {
        //supression dans le répertoire
        fs.unlinkSync(`${imagesPath}${imageId}`)

      } catch (err) {
        return res.status(401).json({
          error: errorHandler.getErrorMessage(err)
        })

      }
    }
  });

  Post.findOneAndDelete({ "_id": `${id}` }).
  exec().then(doc => {
    
    return res.json(doc)

  }).catch(err => {
    return res.status(401).json({
      error: errorHandler.getErrorMessage(err)
    })

  });

}

export default { remove }