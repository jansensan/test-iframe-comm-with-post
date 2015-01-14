(function () {
  
  'use strict';
  
  
  angular
    .module('icontainer.proxies.IframeWindowProxy', [])
    .constant('CHILD_DOMAIN', 'http://content.iframe-test.com:1600')
    .factory('iframeWindowProxy', IframeWindowProxy);


  /* ngInject */
  function IframeWindowProxy(
    $window,
    CHILD_DOMAIN
  ) {

    // public api
    var iframeWindow = $window.frames['iframeContent'].contentWindow;
    var _proxy = {};
    _proxy.helloIframe = helloIframe;

    // private methods
    function init() {
      console.log('--- icontainer.proxies.IframeWindowProxy:init ---');
      
      addEventListeners();
    }

    function addEventListeners() {
      $window.addEventListener("message", onMessageReceived);
    }

    function removeEventListeners() {
      $window.removeEventListener("message", onMessageReceived);
    }

    function postToIframeWindow(data) {
      if(iframeWindow) {
        iframeWindow.postMessage(data, CHILD_DOMAIN);

      } else {
        console.error('Error at icontainer.proxies.IframeWindowProxy:postToIframeWindow. The variable "iframeWindow" is potentially undefined.');
      }
    }

    function helloIframe() {
      console.log('--- icontainer.proxies.IframeWindowProxy:helloIframe ---');
      postToIframeWindow('hello iframe');
    }

    // event handlers
    function onMessageReceived(event) {
      console.log('--- icontainer.proxies.IframeWindowProxy:onMessageReceived ---');

      // ignore messages not sent from child iframe's domain
      if(event.origin !== CHILD_DOMAIN) {
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
    vm.testProxy = iframeWindowProxy.helloIframe;
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
    // vars
    var _count = 0;

    // public api
    var vm = this;
    vm.getCount = getCount;
    vm.increase = increase;
    vm.decrease = decrease;

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