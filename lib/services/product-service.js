"use-strict";

var Promise = require('bluebird'),
  Product = require('../data/models/product');

Promise.promisifyAll(Product);
Promise.promisifyAll(Product.prototype);

function ProductService(){
}

Object.defineProperties(ProductService.prototype, {
  getAll: {
    value: getProducts,
    configurable: false,
    enumerable: false
  },
  getById: {
    value: getProductById,
    configurable: false,
    enumerable: false
  },
  save: {
    value: saveProduct,
    configurable: false,
    enumerable: false
  },
  delete: {
    value: deleteProduct,
    configurable: false,
    enumerable: false
  }
});

function getProducts(){
  return Product.findAsync();
}

function getProductById(id){
  return Product.findByIdAsync(id);
}

function saveProduct(product){
  if(product._id){
    return Product.findByIdAndUpdateAsync(product._id, product);
  } else {
    var newProduct = new Product(product)
    return newProduct.saveAsync();
  }
}

function deleteProduct(id){
  return Product.findByIdAndRemoveAsync(id);
}

module.exports = ProductService;