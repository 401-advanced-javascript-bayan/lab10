'use strict';

const mongoose = require('mongoose');
require('../products-mod/products-schema.js');

const categories = mongoose.Schema({
  name: { type: 'string', required: true },
}, {toObject : { virtuals: true},toJSON : {virtuals :true}});


categories.virtual('realPro', {
  
  ref : 'products',
  
  localField : 'category',
  foreignField : 'name',
  justOne : false,
}); 


categories.pre('findOne', function () {
  try {
   
    this.populate('realPro');
  }
  catch (err) {
    console.error(err);
  }
}); 

module.exports = mongoose.model('categories', categories);