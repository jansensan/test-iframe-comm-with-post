(function () {
  
  'use strict';
  
  angular
    .module('icontent.features.ProxyTester', [
      'icontent.proxies.ParentWindowProxy'
    ])
    .controller('ProxyTesterController', ProxyTesterController)
    .directive('proxytester', ProxyTester);


  function ProxyTester() {
    return {
      restrict: 'E',
      controller: 'ProxyTesterController',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'static/templates/proxy-tester-template.html'
    };
  }


  /* ngInject */
  function ProxyTesterController(parentWindowProxy) {
    // public api
    var vm = this;
    vm.testProxy = parentWindowProxy.test;
  }
  
})();