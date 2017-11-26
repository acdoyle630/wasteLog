/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();


module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {

    username : {
      type : DataTypes.STRING,
      allowNull: false
    },
    password : {
      type : DataTypes.STRING,
      allowNull : false
    }

  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Product, {
          foreignKey: {
            name: "event_id",
            allowNull: true
          }
        });
      }
    }
  });
  return User;
};