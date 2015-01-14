(function () {
  
  'use strict';
  
  
  angular
    .module('icontainer.proxies.IframeWindowProxy', [])
    .constant('CHILD_DOMAIN', 'content.iframe-test.com')
    .factory('iframeWindowProxy', IframeWindowProxy);


  /* ngInject */
  function IframeWindowProxy(CHILD_DOMAIN) {
    // public api
    var _proxy = {};
    _proxy.test = test;

    // private methods
    function test() {
      console.log('--- icontainer.proxies.IframeWindowProxy:test ---');
      console.log('CHILD_DOMAIN: ' + (CHILD_DOMAIN));
    }

    return _proxy;
  }
  
})();
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
(function () {
  
  'use strict';
  
  
  angular
    .module('icontainer.features.CounterDisplay', [])
    .controller('CounterDisplayController', CounterDisplayController)
    .directive('counterdisplay', CounterDisplay);


  function CounterDisplay() {
    return {
      restrict: 'E',
      controller: 'CounterDisplayController',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'static/templates/counter-display-template.html'
    };
  }


  function CounterDisplayController() {
    console.log('--- icontainer.features.CounterDisplayController ---');

    // vars
    var _count = 0;

    // public api
    var vm = this;
    vm.getCount = getCount;
    vm.increase = increase;
    vm.decrease = decrease;

    console.log('vm: ', (vm));
    console.log('vm.getCount: ' + (vm.getCount));
    console.log('vm.increase: ' + (vm.increase));
    console.log('vm.decrease: ' + (vm.decrease));
    console.log('vm.getCount(): ' + (vm.getCount()));

    // private methods
    function getCount() {
      return _count;
    }

    function increase() {
      _count++;
    }

    function decrease() {
      _count--;
    }
  }

  
})();
(function () {
  
  'use strict';
  
  angular
    .module('icontainer.app.ContainerApp', [
      'icontainer.features.ProxyTester',
      'icontainer.features.CounterDisplay',
    ]);
  
})();