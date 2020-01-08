import User from '../../db/models/User';

const auth = require('./auth');

import errorHandler from "../../helpers/dbErrorHelper";


/**
 * user data validation + add in DB 
 * @param {object} req http reqeust
 * @param {object} res http response
 */ 
const create = async (req, res, next) => {

    try {

        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({  error: 'utilisateur dèja existant!' });
        } else {

          const   user = new User(
             req.body
            );

            await user.save();
            
            res.status(200).json({
                message: 'Inscription réussie',
            });
        }

    } catch (e) {

        return res.status(400).send({ error: errorHandler.getErrorMessage(e) });

    }
};
export default {create};  