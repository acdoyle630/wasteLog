/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();


module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {

    productName : {
      type : DataTypes.STRING,
      allowNull: false
    },
    category : {
      type : DataTypes.STRING,
      allowNull : false
    },
    price : {
      type : DataTypes.SMALLINT,
      allowNull : false
    },
    unit : {
      type : DataTypes.STRING,
      allowNull : false
    }

  }, {
    classMethods : {
      associate : function( models ) {
        Product.belongsTo(models.User, {
          foreignKey : {
            name : 'user_id',
            allowNull : false
          }
        });
      }
    }
  });
  return Product;
};