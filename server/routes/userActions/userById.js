

import User   from '../../db/models/User';


const userByID = (req, res, next, id) => {
    User.findById(id)
      .exec((err, user) => {
        
      if (err || !user) 

      return res.status(400).json({
        error: "Utilisateur non trouvé"
      })
      
      req.profile = user
      next()
    })
  }
  export default {userByID}