/*jshint esversion: 6 */

const path = require('path');
const express = require('express');
const user = express.Router();
const db = require('../../models');
const { User } = db;
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcrypt');
const saltRounds = 10;


user.post('/',(req, res) =>{
  console.log(req.body)
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      User.create({
        userName : req.body.userName,
        password : hash
      })
      .then((user) =>{
        res.json(user);
      });
    });
  });
});


user.get('/', (req, res) => {
  User.all()
  .then((users) =>{
    res.json(users);
  });
});





module.exports = user;

