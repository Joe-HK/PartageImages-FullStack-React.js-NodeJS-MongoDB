import User   from '../../db/models/User';
import errorHandler from "../../helpers/dbErrorHelper";

const list = (req, res) => {
  
    User.find((err, users) => {
      if (err) {

        return res.status(400).json({

          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(users)

    }).select('name email created avatarColor')
  }
  
  export default {list}