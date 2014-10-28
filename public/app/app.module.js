(function () {
  "use-strict";

  angular
    .module('app', [
      'ngRoute',
      'ngResource',
      'ui.router',
      'ui.bootstrap',
      'app.core',
      'app.products'
    ])
    .config(['$stateProvider', routeConfig])
    .run(function ($state) {
      $state.go('products');
    });

  function routeConfig($stateProvider) {
    $stateProvider
      .state('products', {
        url: '/products',
        templateUrl: 'app/products/products.html',
        controller: 'ProductsCtrl'
      }).state('viewProduct', {
        url: '/products/:id/view',
        templateUrl: 'app/products/product-details.html',
        controller: 'ProductDetailsCtrl'
      }).state('newProduct', {
        url: '/products/new',
        templateUrl: 'app/products/product-create.html',
        controller: 'ProductCreateCtrl'
      }).state('editProduct', {
        url: '/products/:id/edit',
        templateUrl: 'app/products/product-edit.html',
        controller: 'ProductEditCtrl'
      });
  }
})();
