"use-strict";

var RequireDirectory = require('require-directory'),
  Controllers = RequireDirectory(module, '../lib/api/controllers')
  ProductController = Controllers['product-controller'];

module.exports = {
  routes: [
    { method: 'GET',  path: '/products',  config: ProductController.getProducts },
    { method: 'GET',  path: '/products/{id}',  config: ProductController.getProductById },
    { method: 'POST',  path: '/products',  config: ProductController.createProduct },
    { method: 'PUT',  path: '/products/{id}',  config: ProductController.updateProduct },
    { method: 'DELETE',  path: '/products/{id}',  config: ProductController.deleteProduct },
  ]
};