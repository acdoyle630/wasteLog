/*jshint esversion: 6*/

module.exports = function(sequelize, DataTypes) {
  var Waste = sequelize.define("Waste", {

    productName : {
      type : DataTypes.STRING,
      allowNull: false
    },
    productCategory : {
      type : DataTypes.STRING,
      allowNull : true
    },
    dayOfWeek : {
      type : DataTypes.STRING,
      allowNull : false
    },
    amount : {
      type : DataTypes.DECIMAL,
      allowNull : false
    },
    reason : {
      type : DataTypes.STRING,
      allowNull : false
    },
    week : {
      type : DataTypes.STRING,
      allowNull : false
    },
    user_id : {
      type : DataTypes.INTEGER,
      allowNull : false
    }

  });
  return Waste;
};