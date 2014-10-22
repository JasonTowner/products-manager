"use-strict";

var Joi = require('joi'),
  Boom = require('boom'),
  RequireDirectory = require('require-directory'),
  Services = RequireDirectory(module, '../../services'),
  ProductService = new Services['product-service']();

var internals = {
  getProducts: function(request, reply){
    ProductService.getAll()
      .then(function(products){
        return reply(products);
      }).catch(function(err){
        return reply(Boom.serverTimeout(err));
      })
  },
  getProductById: function(request, reply){
    ProductService.getById(request.params.id)
      .then(function(products){
        return reply(products);
      }).catch(function(err){
        return reply(Boom.notFound(err));
      })
  },
  saveProduct: function(request, reply){
    ProductService.save(request.payload)
      .then(function(){
        return reply();
      }).catch(function(err){
        return reply(Boom.notFound(err));
      })
  },
  deleteProducts: function(request, reply){
    ProductService.delete(request.params.id)
      .then(function(){
        return reply();
      }).catch(function(err){
        return reply(Boom.notFound(err));
      })
  }
}

module.exports = {
  getProducts: {
    description: 'Get all products',
    handler: internals.getProducts
  },

  getProductById: {
    description: 'Get product details by id',
    validate: {
      params: {
        id: Joi.string().required()
      }
    },
    handler: internals.getProductById
  },

  createProduct: {
    description: 'Create a new product',
    validate: {
      payload: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string(),
        price: Joi.number().min(0).precision(2).required()
      })
    },
    handler: internals.saveProduct
  },

  updateProduct: {
    description: 'Update an existing product',
    validate: {
      payload: Joi.object().keys({
        '_id': Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string(),
        price: Joi.number().min(0).precision(2).required()
      }).unknown(true)
    },
    handler: internals.saveProduct
  },

  deleteProduct: {
    description: 'Delete an existing product',
    validate: {
      params: {
        id: Joi.string().required()
      }
    },
    handler: internals.deleteProducts
  }
};