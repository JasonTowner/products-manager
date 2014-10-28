(function () {
  "use-strict";

  angular
    .module('app.core')
    .factory('AlertService', ['$rootScope', '$timeout', AlertService]);

  function AlertService($rootScope, $timeout) {
    var alertService = {};

    $rootScope.alerts = [];

    $rootScope.addAlert = alertService.addAlert = function (type, msg) {
      var alert = {'type': type, 'msg': msg};
      $rootScope.alerts.push(alert);
      $timeout(function(){
        var index = $rootScope.alerts.indexOf(alert);
        $rootScope.alerts.splice(index, 1);
      }, 5000);
    };

    $rootScope.closeAlert = alertService.closeAlert = function (index) {
      $rootScope.alerts.splice(index, 1);
    };

    return alertService;
  };
})();