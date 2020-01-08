'use strict';

var path = require('path');
const CURRENT_WORKING_DIR = process.cwd();

/**
 * @param {object} req http request
 * @param {object} res http response
 */
 const getPost = (req, res, next) => {

        console.log ('msg')
        var options = {
          root: path.join(CURRENT_WORKING_DIR, 'public'),
          dotfiles: 'deny',
          headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
          }
        }
      
        var fileName = req.params.postId
        console.log(fileName)
        res.sendFile(fileName, options, function (err) {
          if (err) {
            next(err)
          } else {
       
              console.log("Envoi réussi")            
          }
        })
      }

export default {getPost}