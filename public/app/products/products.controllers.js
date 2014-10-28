(function () {
  angular
    .module('app.products')
    .controller('ProductsCtrl', ['$scope', 'Product', 'AlertService', Products])
    .controller('ProductDetailsCtrl', ['$scope', '$stateParams', 'Product', 'AlertService', ProductDetails])
    .controller('ProductCreateCtrl', ['$scope', '$state', '$stateParams', 'Product', 'AlertService', ProductCreate])
    .controller('ProductEditCtrl', ['$scope', '$state', '$stateParams', 'Product', 'AlertService', ProductEdit]);

  function Products($scope, Product, AlertService) {
    $scope.title = 'Products';

    $scope.getProducts = getProducts;
    $scope.deleteProduct = deleteProduct;

    initialize();

    function initialize() {
      return getProducts();
    }

    function getProducts() {
      $scope.products = Product.query(function (products) {
        return products;
      });
    }

    function deleteProduct(product) {
      var productToDelete = Product.get({id: product._id}, function () {
        productToDelete.$delete(function () {
          var index = $scope.products.indexOf(product);
          if(index >= 0) {
            $scope.products.splice(index, 1)
          }
          var message = 'Deleted';
          AlertService.addAlert('success', message);
          console.log(message);
        }, function(err){
          AlertService.addAlert('danger', 'Failed to delete the message. See console for more details.');
          console.log(err);
        })
      })
    }
  }

  function ProductDetails($scope, $stateParams, Product, AlertService) {
    $scope.product = Product.get({ id: $stateParams.id });
    $scope.product.$promise.then(function(){}, function(err){
      AlertService.addAlert('danger', 'Failed to retrieve the product details. See console for more details');
      console.log(err);
    });
  }

  function ProductCreate($scope, $state, $stateParams, Product, AlertService) {

    $scope.createProduct = createProduct;
    $scope.product = new Product();

    function createProduct(product) {
      $scope.product.data = product;
      $scope.product.$save(function () {
        var message = 'Saved';
        AlertService.addAlert('success', message);
        console.log(message);
        $state.go('products');
      }, function(err){
        AlertService.addAlert('danger', 'Failed to create the product. See console for more details');
        console.log(err);
      });
    }
  }

  function ProductEdit($scope, $state, $stateParams, Product, AlertService) {

    $scope.loadProduct = loadProduct;
    $scope.updateProduct = updateProduct;

    loadProduct();

    function updateProduct() {
      $scope.product.$update(function () {
        var message = 'Saved';
        AlertService.addAlert('success', message);
        console.log(message);
        $state.go('products');
      }, function(err){
        AlertService.addAlert('danger', 'Failed to update the product. See console for more details');
        console.log(err);
      });
    }

    function loadProduct() {
      $scope.product = Product.get({id: $stateParams.id});
    }
  }
})();