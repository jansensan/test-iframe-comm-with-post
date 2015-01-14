(function () {
  
  'use strict';
  
  angular
    .module('icontainer.features.ProxyTester', [
      'icontainer.proxies.IframeWindowProxy'
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
  function ProxyTesterController(iframeWindowProxy) {
    // public api
    var vm = this;
    vm.testProxy = iframeWindowProxy.test;
  }
  
})();