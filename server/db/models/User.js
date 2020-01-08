import crypto from 'crypto'
const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    hashed_password: {
        type: String,
       required: true,
    },
    salt: String,
    
    avatarColor:{
      type: String,
      //génération alétoir des couleurs
      default: "#"+((1<<24)*Math.random()|0).toString(16)
    }
    
})


userSchema.virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() {
    return this._password
  });

userSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'mot de passe > 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'mot de passe requis.')
  }
}, null)


userSchema.methods = {
  authenticate: function(text) {
    return this.encryptPassword(text) === this.hashed_password
  },

  encryptPassword: function(password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },

  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
}


//changement après l'ajout de crypto! validation direct avec schema pas besoin de Joi
export default mongoose.model('User',userSchema );

