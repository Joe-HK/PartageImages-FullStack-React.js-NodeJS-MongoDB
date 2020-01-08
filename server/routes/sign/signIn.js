'use strict';
import User from '../../db/models/User';
import errorHandler from "../../helpers/dbErrorHelper";

import signToken from'./auth'
const jwtConfig = require('../../config/jwt-config');




/**
 * passport
 * @param {object} req http reqeust
 * @param {object} res http response
 */
const connect = async (req, res) => {

  try{
    const user =await  User.findOne({
        "email": req.body.email})
      
        if (!user)
        return res.status(401).json({
          error: "Utilisateur non trouvé"
        })
            //mehode créée dans le schema User (authenticate)
      if (!user.authenticate(req.body.password)) {
        return res.status(401).send({
          error: "Mot de passe ou email incorrect."
        })
      }    

    let token = signToken.signToken(user.email);
        //à enlever !
    res.cookie("t", token, {
        expire: jwtConfig.expiresIn
      })

    res.status(200).json(
        {
            token,
            user: {_id: user._id, name: user.name, email: user.email,avatarColor:user.avatarColor }
          });

    }catch(err){
            return res.status(301).send({
            error: err})
}
  
};


export default {connect};