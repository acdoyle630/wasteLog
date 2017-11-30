
/*jshint esversion: 6 */

const express = require('express');
const product = express.Router();
const db = require('../../models');
const { Waste } = db;

waste.post('/', ( req, res ) => {
  console.log( req.user);
  console.log(req.body);
  Waste.create(
    {
      productName: req.body.productName,
      productCategory : req.body.productCategory,
      dayOfWeek : req.body.dayOfWeek,
      amount : req.body.amount,
      reason : req.body.reason,
      week : req.body.week,
      user_id : req.user.id
    } )
  .then(waste =>{
    res.json( waste );
  })
    .catch( err => {
      res.json( err );
    });
});

waste.get('/', (req, res) => {
  Waste.all( { raw: true,
    where: {
      user_id : req.user.id
    }
  })
  .then((waste) =>{
    res.json(waste);
  });
});

waste.put('/:id', (req,res) => {
  let path = req.path.split('/')[1];
  Waste.update({
      productName: req.body.productName,
      productCategory : req.body.productCategory,
      dayOfWeek : req.body.dayOfWeek,
      amount : req.body.amount,
      reason : req.body.reason,
      week : req.body.week,
  },  {
      where: {
        id: path
      }
    })
    .then(data => {
      res.send('posted');
    });
});

waste.delete('/:id', ( req, res ) => {
  let path = req.path.split('/')[1];
  Waste.destroy({
    where: {
      id: path
    }
  } )
  .then( waste => {
    res.json( waste );
  })
  .catch( err => {
    res.json( err );
  });
});





module.exports = waste;

