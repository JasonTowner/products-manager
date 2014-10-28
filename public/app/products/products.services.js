(function () {
  "use-strict";

  angular
    .module('app.products')
    .factory('ProductsService', ['$http', ProductService]);

  function ProductService($http) {

    var baseUrl = '/api/products';

    var service = {
      getProducts: getProducts,
      getProductById: getProductById,
      createProduct: createProduct,
      updateProduct: updateProduct,
      deleteProduct: deleteProduct
    }

    return service;

    function getProducts() {
      return $http({method: 'GET', url: baseUrl})
        .success(function(response){
          return response;
        })
        .error(function(err){
          console.log(err);
          return err;
        });
    };

    function getProductById(id) {
      return $http({method: 'GET', url: baseUrl + '/' + id})
        .success(function(response){
          return response;
        })
        .error(function(err){
          console.log(err);
          return err;
        });
    };

    function createProduct(product) {
      return $http({method: 'POST', url: baseUrl, data: product})
        .success(function(response){
          return response;
        })
        .error(function(err){
          console.log(err);
          return err;
        });
    };

    function updateProduct(product) {
      return $http({method: 'PUT', url: baseUrl + '/' + product._id, data: product})
        .success(function(response){
          return response;
        })
        .error(function(err){
          console.log(err);
          return err;
        });
    };

    function deleteProduct(id) {
      return $http({method: 'DELETE', url: baseUrl + '/' + id})
        .success(function(response){
          return response;
        })
        .error(function(err){
          console.log(err);
          return err;
        });
    };
  };
})();