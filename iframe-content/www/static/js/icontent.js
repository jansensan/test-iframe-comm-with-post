(function () {
  
  'use strict';
  
  angular
    .module('icontent.services.PostOfficeService', [
      'PostOffice'
    ])
    .config(PostOfficeConfig)
    .factory('postOfficeService', PostOfficeService);


  /* ngInject */
  function PostOfficeConfig($windowProvider, postOfficeConfigProvider) {
    postOfficeConfigProvider.setName('icontentPostOffice');
    postOfficeConfigProvider.setRecipientDomain('http://container.iframe-test.com:3200');
    postOfficeConfigProvider.setRecipientWindow($windowProvider.$get().parent);
  }

  /* ngInject */
  function PostOfficeService(postOffice) {
    // public api
    var _service = {};
    _service.test = test;

    // private methods
    function test() {
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
  
  angular
    .module('icontent.features.IFrameContent', [
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