
var express = require('express')
, jwtMiddleware = require('express-jwt')



import signUp from './sign/signUp'
import signIn from './sign/signIn'
import signOut from './sign/signOut'
import postImage from'./postingActions/insertPost'
import getImage from'./postingActions/getImage'

import remove from'./postingActions/removePost'


import usersList from'./userActions/usersList'

import getUsers from'./userActions/getUsers'


import userByID from'./userActions/userById'
import util from'./userActions/util'
import getPosts from'./postingActions/getPosts'
import like from'./postingActions/like'
import unlike from'./postingActions/unlike'
import addComment from'./postingActions/addComment'
import removeComment from'./postingActions/removeComment'

//pour la clé s
const jwtConfig = require('../../server/config/jwt-config');


const router = express.Router()
//gestion  des autorisation qui inclut toutes avec un préfixe /api/posts

//pour les postes 
router.use('/api/posts', jwtMiddleware({
 
  secret: jwtConfig.secret,

  getToken: function (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { // Authorization: Bearer g1jipjgi1ifjioj
      // Handle token presented as a Bearer token in the Authorization header
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      // Handle token presented as URI param
      return req.query.token;
    } else if (req.cookies && req.cookies.token) {
      // Handle token presented as a cookie parameter
      return req.cookies.token;
    }
    // If we return null, we couldn't find a token.
    // In this case, the JWT middleware will return a 401 (unauthorized) to the client for this request
    return null; 
  }
}));
//pour les routes user

router.use('/api/users', jwtMiddleware({
 
  secret: jwtConfig.secret, 

  getToken: function (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { // Authorization: Bearer g1jipjgi1ifjioj
      // Handle token presented as a Bearer token in the Authorization header
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      // Handle token presented as URI param
      return req.query.token;
    } else if (req.cookies && req.cookies.token) {
      // Handle token presented as a cookie parameter
      return req.cookies.token;
    }

    return null; 
  }
}));





router.param('userId', userByID.userByID)


//création d'un compte
router.route('/api/newuser')
  .post(signUp.create)

  
  //connexion
router.route('/auth/signin')
.post(signIn.connect)

//déconnexion
router.route('/auth/signout')
  .get(signOut.signout)

//partager une image
router.route('/api/posts/new/:userId')
  .post( postImage.postImage)

  //public STATIC pas besoin de sécurisé !
router.route('/api/photo/:postId').get( getImage.getPost)


//récupérer tout les posts
router.route('/api/posts/wall/:userId')
  .get( getPosts.wallList)



//mettre un like sur un post
router.route('/api/posts/like')
  .put( like.like)

//4
router.route('/api/posts/unlike')
  .put( unlike.unlike)
//5
router.route('/api/posts/comment')
  .put( addComment.comment)


router.route('/api/posts/uncomment')
  .put( removeComment.uncomment)



  

  

router.route('/api/posts/:postId').delete(remove.remove)

router.route('/api/users').get(usersList.list)

router.route('/api/users/findusers/:userId')
   .get(getUsers.findPeople)


router.route('/api/users/:userId').get( util.read);




export default router;