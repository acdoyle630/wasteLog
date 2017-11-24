/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();


module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {

    userName : {
      type : DataTypes.STRING,
      allowNull: false
    },
    password : {
      type : DataTypes.STRING,
      allowNull : false
    }

  });

  return User;
};