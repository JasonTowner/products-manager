"use-strict";

var chai = require('chai'),
  Mongoose = require('mongoose'),
  ProductService = require('../lib/services/product-service');

chai.should();

var internals = {};

before(function(next){
  internals.productService = new ProductService();
  var mongoUri = 'mongodb://localhost:27017/products-management-tests';
  Mongoose.connect(mongoUri);
  var connection = Mongoose.connection;
  connection.once('open', function(){
    console.log('Mongo connected at: ' + mongoUri);
    next();
  })
});

describe('Products Service Integration Tests', ProductServiceTests);

function ProductServiceTests(){
  it('Can retrieve all products', GetAllProducts);

  it('Can retrieve an individual product', GetProduct);

  it('Can create a new product', CreateProduct);

  it('Can update a product', UpdateProduct);

  it('Can delete a product', DeleteProduct);

  function GetAllProducts(next){
    var product = {
      name: 'Test Product',
      description: 'Test description',
      price: 1.99
    };
    internals.productService.save(product)
      .then(function(savedProduct) {
        internals.productService.getAll()
          .then(function (result) {
            result.should.be.ok;
            result.should.have.length.greaterThan(0);
            next();
          }).catch(function (err) {
            next(err);
          });
      }).catch(function(err){
        next(err);
      });
  }

  function GetProduct(next){
    var product = {
      name: 'Test Product',
      description: 'Test description',
      price: 1.99
    };
    internals.productService.save(product)
      .then(function(savedProducts){
        internals.productService.getById(savedProducts[0]._id)
          .then(function(result){
            result.should.be.ok;
            result.should.have.property('_id');
            next();
          }).catch(function(err){
            next(err);
          });
      })
  }

  function CreateProduct(next){
    var product = {
      name: 'Test Product',
      description: 'Test description',
      price: 1.99
    };
    internals.productService.save(product)
      .then(function(result){
        result.should.be.ok;
        result[0].should.have.property('_id');
        next();
      }).catch(function(err){
        next(err);
      });
  }

  function UpdateProduct(next){
    var product = {
      name: 'Test Product',
      description: 'Test description',
      price: 1.99
    };
    internals.productService.save(product)
      .then(function(newProducts){
        var name = 'New Name';
        var newProduct = newProducts[0].toObject();
        newProduct.should.be.ok;
        newProduct.name = name;
        internals.productService.save(newProduct)
          .then(function(result){
            result.should.be.ok;
            result.should.have.property('name', name);
            next();
          }).catch(function(err){
            next(err);
          });
      }).catch(function(err){
        next(err);
      })
  }

  function DeleteProduct(next){
    var product = {
      name: 'Test Product',
      description: 'Test description',
      price: 1.99
    };
    internals.productService.save(product)
      .then(function(newProducts){
        internals.productService.delete(newProducts[0]._id)
          .then(function(result){
            result.should.be.ok;
            next();
          }).catch(function(err){
            next(err);
          });
      }).catch(function(err){
        next(err);
      });
  }
}