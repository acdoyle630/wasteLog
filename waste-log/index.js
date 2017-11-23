/*jshint esversion: 6*/

//server
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;


app.listen(PORT, () =>{
  console.log(`server listening on port: ${PORT}`);
  //db.sequelize.sync({forceSync: true});
});