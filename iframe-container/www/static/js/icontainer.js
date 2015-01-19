(function () {
  
  'use strict';
  
  angular
    .module('icontainer.services.PostOfficeService', [
      'PostOffice'
    ])
    .factory('postOfficeService', PostOfficeService);


  /* ngInject */
  function PostOfficeService($window, postOffice) {
    // init post office
    postOffice.init({
      name: 'icontainerPostOffice',
      currentWindow: $window,
      recipientWindow: document.getElementById('iframeContent').contentWindow,
      recipientDomain: 'http://content.iframe-test.com:1600'
    });

    // public api
    var _service = {};
    _service.test = test;

    // private methods
    function test() {
      console.log('--- icontainer.services.PostOfficeService:test ---');
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
      controllerAs: 'postOfficeTesterVM',
      bindToController: true,
      templateUrl: 'static/templates/post-office-tester-template.html'
    };
  }


  /* ngInject */
  function PostOfficeTesterController($window, postOfficeService) {
    console.log('--- PostOfficeTesterController ---');

    // public api
    var postOfficeTesterVM = this;
    postOfficeTesterVM.test = postOfficeService.test;
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
      controllerAs: 'counterDisplayVM',
      bindToController: true,
      templateUrl: 'static/templates/counter-display-template.html'
    };
  }


  function CounterDisplayController() {
    // vars
    var _count = 0;

    // public api
    var counterDisplayVM = this;
    counterDisplayVM.getCount = getCount;
    counterDisplayVM.increase = increase;
    counterDisplayVM.decrease = decrease;

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