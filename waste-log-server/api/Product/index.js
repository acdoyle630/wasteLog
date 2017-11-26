/*jshint esversion: 6 */

const express = require('express');
const product = express.Router();
const db = require('../../models');
const { Product } = db;

product.post('/', ( req, res ) => {
  Product.create(
    {
      productName: req.body.productName,
      productCategory : req.body.productCategory,
      productPrice : req.body.productPrice,
      productUnit : req.body.productUnit,
      user_id : req.user.id
    } )
  .then(product =>{
    res.json( product );
  })
    .catch( err => {
      res.json( err );
    });
});

product.get('/', (req, res) => {
  Product.all( { raw: true } )
  .then((products) =>{
    res.json(products);
  });
});





module.exports = product;

