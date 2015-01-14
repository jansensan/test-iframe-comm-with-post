(function () {
  
  'use strict';


  angular
    .module('icontent.proxies.ParentWindowProxy', [])
    .constant('PARENT_DOMAIN', 'http://container.iframe-test.com:3200')
    .factory('parentWindowProxy', ParentWindowProxy);


  /* ngInject */
  function ParentWindowProxy(
    $window,
    PARENT_DOMAIN
  ) {

    // public api
    var parentWindow = $window.parent;
    var _proxy = {};
    _proxy.helloParent = helloParent;

    // private methods
    function init() {
      console.log('--- icontent.proxies.ParentWindowProxy:init ---');
      
      addEventListeners();
    }

    function addEventListeners() {
      $window.addEventListener("message", onMessageReceived);
    }

    function removeEventListeners() {
      $window.removeEventListener("message", onMessageReceived);
    }

    function postToParentWindow(data) {
      if(parentWindow) {
        parentWindow.postMessage(data, PARENT_DOMAIN);

      } else {
        console.error('Error at icontent.proxies.ParentWindowProxy:postToParentWindow. The variable "parentWindow" is potentially undefined.');
      }
    }

    function helloParent() {
      console.log('--- icontent.proxies.ParentWindowProxy:helloParent ---');
      postToParentWindow('hello parent');
    }

    // event handlers
    function onMessageReceived(event) {
      console.log('--- icontent.proxies.ParentWindowProxy:onMessageReceived ---');

      // ignore messages not sent from the parent's domain
      if(event.origin !== PARENT_DOMAIN) {
        return;
      }

      console.log('event.data: ', event.data);
    }

    // init
    init();

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
    vm.testProxy = parentWindowProxy.helloParent;
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