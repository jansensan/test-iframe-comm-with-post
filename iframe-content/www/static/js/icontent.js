(function () {
  
  'use strict';
  
  angular
    .module('icontent.services.PostOfficeService', [
      'PostOffice'
    ])
    .factory('postOfficeService', PostOfficeService);


  /* ngInject */
  function PostOfficeService($window, postOffice) {
    // init post office
    var postOfficeConfig = {
      name: 'icontentPostOffice',
      currentWindow: $window,
      recipientWindow: $window.parent,
      recipientDomain: 'http://container.iframe-test.com:3200'
    };
    postOffice.init(postOfficeConfig);

    // public api
    var _service = {};
    _service.test = test;

    // private methods
    function test() {
      console.log('--- icontent.services.PostOfficeService:test ---');
      postOffice.send('hello post office');
    }

    return _service;
  }
  
})();
(function () {
  
  'use strict';
  
  angular
    .module('icontent.features.PostOfficeTester', [
      'icontent.services.PostOfficeService'
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
    .module('icontent.features.StateToggle', [])
    .controller('StateToggleController', StateToggleController)
    .directive('statetoggle', StateToggle)

  function StateToggle() {
    return {
      restrict: 'E',
      controller: 'StateToggleController',
      controllerAs: 'vm',
      bindToController: true,
      templateUrl: 'static/templates/state-toggle-template.html'
    };
  }

  function StateToggleController() {
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
  
  angular
    .module('icontent.features.IFrameContent', [
      'icontent.features.StateToggle',
      'icontent.features.PostOfficeTester'
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


  function IFrameContentController() {
    var vm = this;
  }
  
})();
(function () {
  
  'use strict';
  
  angular
    .module('icontent.app.IframeApp', [
      'icontent.features.IFrameContent'
    ]);
  
})();