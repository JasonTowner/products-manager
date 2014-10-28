angular
  .module('app.products')
  .factory('Product', function($resource) {
    return $resource('/api/products/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
});