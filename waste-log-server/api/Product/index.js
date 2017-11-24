/*jshint esversion: 6 */

const express = require('express');
const product = express.Router();
const db = require('../../models');
const { Product } = db;

product.post('/', ( req, res ) => {
  console.log('hitting product api');
  console.log(req.body);
  Product.create( req.body )
  .then(product =>{
    res.json( product );
  })
    .catch( err => {
      res.json( err );
    });
});





module.exports = product;
