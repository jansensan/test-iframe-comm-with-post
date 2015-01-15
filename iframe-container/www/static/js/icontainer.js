(function () {
  
  'use strict';
  
  angular
    .module('icontainer.services.PostOfficeService', [
      'PostOffice'
    ])
    .config(PostOfficeConfig)
    .factory('postOfficeService', PostOfficeService);


  /* ngInject */
  function PostOfficeConfig($windowProvider, postOfficeProvider) {
    var win = $windowProvider.$get(),
        p = postOfficeProvider;

    p.name = 'icontainerPostOffice';
    p.currentWindow = win;
    p.recipientWindow = win.frames['iframeContent'].contentWindow;
    p.recipientDomain = 'http://content.iframe-test.com:1600';
  }

  /* ngInject */
  function PostOfficeService(postOffice) {
    // public api
    var _service = {};
    _service.test = test;

    // private methods
    function test() {
      postOffice.send('hello child');
    }

    return _service;
  }
  
})();
(function () {
  
  'use strict';
  
  angular
    .module('icontainer.features.PostOfficeTester', [
      'icontainer.services.PostOfficeService'
    ])
    .controller('PostOfficeTesterController', PostOfficeTesterController)
    .directive('postofficetester', PostOfficeTester);


  function PostOfficeTester() {
    return {
      restrict: 'E',
      controller: 'PostOfficeTesterController',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'static/templates/post-office-tester-template.html'
    };
  }


  /* ngInject */
  function PostOfficeTesterController(postOfficeService) {
    // public api
    var vm = this;
    vm.test = postOfficeService.test;
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
      'icontainer.features.CounterDisplay',
      'icontainer.features.PostOfficeTester'
    ]);
  
})();