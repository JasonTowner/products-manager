"use-strict";

var RequireDirectory = require('require-directory'),
  Controllers = RequireDirectory(module, '../lib/api/controllers')
ProductController = Controllers['product-controller'];

module.exports = {
  routes: [
    { method: 'GET', path: '/api/products', config: ProductController.getProducts },
    { method: 'GET', path: '/api/products/{id}', config: ProductController.getProductById },
    { method: 'POST', path: '/api/products', config: ProductController.createProduct },
    { method: 'PUT', path: '/api/products/{id}', config: ProductController.updateProduct },
    { method: 'DELETE', path: '/api/products/{id}', config: ProductController.deleteProduct },
    { method: 'GET', path: '/{param*}', config: {
        handler: {
          directory: {
            path: 'public'
          }
        },
        plugins: {
          lout: false
        }
      }
    }
  ]
};