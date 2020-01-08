'use strict';





var express = require('express')
  , jwtMiddleware = require('express-jwt')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , cors = require('cors')





var path = require('path');
const CURRENT_WORKING_DIR = process.cwd();

const db_init = require('./db/db_init');
const port = 5000;

import compress from 'compression'

//pour le mode dev - a commenter en prod
import devBundle from './devBundle'

const app = express();

app.use('/public', express.static('dist'));
//pour le mode dev
//connexion mongo


db_init.connect();

devBundle.compile(app);

//middlewares
const header = require('./middleware/header');




app.use(cookieParser())
app.use(compress())
app.use(cors())
app.use(header());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//

import Template from './../template'
import router from './routes/router'


app.use('/', router);

/*
const auth = require('./routes/sign/auth');
const getImage = require('./routes/crud/getImage');
const signUp = require('./routes/sign/signUp');
const signIn = require('./routes/sign/signIn');
const addComment = require('./routes/crud/addComment');
const { upload,uploadResponse} =require('./routes/crud/insertImage')
const remove = require('./routes/crud/delete');
const update = require('./routes/crud/update');

const getAllUserImages = require('./routes/crud/getAllUserImages');
const getAllUsers = require('./routes/crud/getAllUsers');
*/

// modules pout le  server side rendering
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MainRouter from './../client/MainRouter'
import StaticRouter from 'react-router-dom/StaticRouter'

import { SheetsRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from 'material-ui/styles'
import {teal, orange} from '@material-ui/core/colors'
//

//end points
//app.post('/api/signUp', signUp);
//app.post('/api/signIn', signIn);
//app.get('/api/images/imageId',auth.isAuthenticated(), getImage);
//app.post('/api/insertImage/',upload.single('file'),uploadResponse);
//app.put('/api/update',update);
//app.delete('/api/delete/:ImageId',remove);
//app.get('/api/getAllUserImages',getAllUserImages);
//app.get('/api/getAllUsers',getAllUsers);


//app.get('/api/images/'/*,auth.isAuthenticated()*/, getImage);
//app.post('/api/insertImage/',upload.single('file'),uploadResponse);
//app.put('/api/update',update);
//app.delete('/api/delete',remove);


app.get('*', (req, res) => {
  const sheetsRegistry = new SheetsRegistry()
  const theme = createMuiTheme({
    palette: {

      
      primary: {
      light: '#52c7b8',
      main: '#4267B2',
      dark: '#282828',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffd95b',
      main: '#63747a',
      dark: '#c77800',
      contrastText: '#000',
    },
      openTitle: teal['700'],
      protectedTitle: orange['700'],
      type: 'light'
    }
  })
  const generateClassName = createGenerateClassName()
  const context = {}
  const markup = ReactDOMServer.renderToString(
     <StaticRouter location={req.url} context={context}>
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
           <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          
             <MainRouter/>
          
           </MuiThemeProvider>
        </JssProvider>
     </StaticRouter>
    )
   if (context.url) {
     return res.redirect(303, context.url)
   }
   const css = sheetsRegistry.toString()
   res.status(200).send(Template({
     markup: markup,
     css: css
   }))
})


app.listen(port, () => {
    console.log(`express app listening on port ${port}`);
});
