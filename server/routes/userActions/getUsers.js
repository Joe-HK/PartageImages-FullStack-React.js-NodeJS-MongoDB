import User   from '../../db/models/User';
import errorHandler from "../../helpers/dbErrorHelper";

const findPeople = (req, res) => {
   
    User.find( (err, users) => {
      if (err) {
        return res.status(400).json({
     
          error: errorHandler.getErrorMessage(err)
        })
      }
      console.log(users )

      res.json(users)
    }).select('name avatarColor')
  }
  export default{findPeople}