/*jshint esversion: 6*/

module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {

    productName : {
      type : DataTypes.STRING,
      allowNull: false
    },
    productCategory : {
      type : DataTypes.STRING,
      allowNull : true
    },
    productPrice : {
      type : DataTypes.DECIMAL,
      allowNull : false
    },
    productUnit : {
      type : DataTypes.STRING,
      allowNull : false
    },
    user_id : {
      type : DataTypes.INTEGER,
      allowNull : false
    }

  });
  return Product;
};