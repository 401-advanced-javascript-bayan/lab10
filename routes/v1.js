/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable strict */
'use strict';

const express = require('express');
const router = express.Router();

const categories = require('../models/categories/categories-module.js');
const products = require('../models/products/products-module.js');
/**
 * dynaminc modele route
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
function getModel(req, res, next) {
  let model = req.params.model;

  switch(model) {
  case 'categories':
    req.model = categories;
    next();
    return;
  case 'products':
    req.model = products;
    next();
    return;
  default:
    next('invalid model');
    return;
  }
}

router.param('model', getModel);

router.get('/api/v1/:model', get1);
router.post('/api/v1/:model', post);
router.get('/api/v1/:model/:id', get);
router.put('/api/v1/:model/:id', update);
router.delete('/api/v1/:model/:id', delete1);
/**
 *handler function for get all
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

function get1(req, res, next) {
  req.model.get()
    .then(results => {
      console.log('******** results: *********', results);
      let count = results.length;
      res.status(200).json({ count, results });
    });
}
/**
 *handler function for get one modele
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function get(req, res, next) {
  let id = req.params.id;
  req.model.get(id)
    .then(record => {
      res.status(200).json(record);
    }).catch(next);
}
/**
 * handler function for post modele route
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function post(req, res, next) {
  req.model.create(req.body)
    .then(results => {
      res.status(201).json(results);
    }).catch(next);
}
/**
 * handler function for update modele route
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function update(req, res, next) {
  let id = req.params.id;
  req.model.update(id,req.body)
    .then(results => {
      res.status(200).json(results);
    }).catch(next);
}
/**
 * handler function for delete modele route
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function delete1(req, res, next) {
  let id = req.params.id;
  const message = 'Item is deleted';
  req.model.delete(id)
    .then(results => {
      res.status(200).json({message});
    }).catch(next);
}

module.exports = router;