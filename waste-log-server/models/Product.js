/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();


module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {

    productName : {
      type : DataTypes.STRING,
      allowNull: false
    }

  });

  return Product;
};