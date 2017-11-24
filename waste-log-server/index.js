/*jshint esversion: 6*/

//server
const session = require('express-session');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const db = require('./models');
const bodyParser = require('body-parser');

app.use(bodyParser.json({extended: true}));

app.use('/api', require('./api'));

app.listen(PORT, () =>{
  console.log(`server listening on port: ${PORT}`);
  db.sequelize.sync({forceSync: true});
});