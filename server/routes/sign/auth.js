'use strict';
import expressJwt from 'express-jwt'
const compose = require('composable-middleware');

const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt-config');
const vaildateJwt = require('express-jwt')({secret: jwtConfig.secret});

/**
 *
 * @type {function}
 * @param {string} id
 */
function signToken(id) {
    return jwt.sign({id: id}, jwtConfig.secret, {expiresIn: jwtConfig.expiresIn});
}




  export default {
    signToken,
  }
