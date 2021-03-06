/*jshint esversion: 6 */
const express = require('express');
const Router  = express.Router();

Router.use('/product', require('./Product'));
Router.use('/user', require('./User'));
Router.use('/waste', require('./Waste'));


module.exports = Router;