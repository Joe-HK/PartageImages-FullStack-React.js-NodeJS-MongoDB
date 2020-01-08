const mongoose = require('mongoose');

 const connect = function (){

    mongoose.connect('mongodb://localhost/api',{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true } )
     mongoose.connect('mongodb://localhost/api',{ useNewUrlParser: true,useUnifiedTopology: true } )
         .then(() => console.log('MongoDB connecté !'))
         .catch(err => console.error('Erreur mongoDB', err));
 }

exports.connect = connect;