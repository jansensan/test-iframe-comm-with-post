(function () {
  
  'use strict';


  angular
    .module('icontent.proxies.ParentWindowProxy', [])
    .constant('PARENT_DOMAIN', 'container.iframe-test.com')
    .factory('parentWindowProxy', ParentWindowProxy);


  /* ngInject */
  function ParentWindowProxy(PARENT_DOMAIN) {
    // public api
    var _proxy = {};
    _proxy.test = test;

    // private methods
    function test() {
      console.log('--- icontent.proxies.ParentWindowProxy:test ---');
      console.log('PARENT_DOMAIN: ' + (PARENT_DOMAIN));
    }

    return _proxy;
  }
  
  
})();
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
(function () {
  
  angular
    .module('icontent.features.IFrameContent', [
      'icontent.features.ProxyTester'
    ])
    .controller('IFrameContentController', IFrameContentController)
    .directive('iframecontent', IFrameContent);


  function IFrameContent() {
    return {
      restrict: 'E',
      controller: 'IFrameContentController',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'static/templates/iframe-content-template.html'
    };
  }


  /* ngInject */
  function IFrameContentController() {
    // vars
    var _states = {
      ON: 'on',
      OFF: 'off'
    }
    var _state = _states.ON;

    // public api
    var vm = this;
    vm.turnOn = turnOn;
    vm.turnOff = turnOff;
    vm.getCurrentState = getCurrentState;
    vm.isOn = isOn;
    vm.isOff = isOff;

    // private methods
    function turnOn() {
      _state = _states.ON;
    }

    function turnOff() {
      _state = _states.OFF;
    }

    function getCurrentState() {
      return _state;
    }

    function isOn() {
      return _state === _states.ON;
    }

    function isOff() {
      return _state === _states.OFF;
    }
  }
  
})();
(function () {
  
  'use strict';
  
  angular
    .module('icontent.app.IframeApp', [
      'icontent.features.IFrameContent'
    ]);
  
})();