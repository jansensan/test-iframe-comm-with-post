(function () {
  
  'use strict';
  
  angular
    .module('icontent.services.PostOfficeService', [
      'PostOffice'
    ])
    .factory('postOfficeService', PostOfficeService);


  /* ngInject */
  function PostOfficeService($rootScope, $window, postOffice, PostOfficeEvents) {
    // init post office
    postOffice.init({
      name: 'icontentPostOffice',
      currentWindow: $window,
      recipientWindow: $window.parent,
      recipientDomain: 'http://container.iframe-test.com:3200'
    });
    $rootScope.$on(PostOfficeEvents.MESSAGE_RECEIVED, onMessageReceived);

    // public api
    var _service = {};
    _service.test = test;

    // private methods
    function test() {
      postOffice.send('hello parent');
    }

    // event handlers
    function onMessageReceived(event, data) {
      console.log('--- icontent.services.PostOfficeService:onMessageReceived ---');
      console.log('message: ', data);
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
      controllerAs: 'postOfficeTesterVM',
      bindToController: true,
      templateUrl: 'static/templates/post-office-tester-template.html'
    };
  }


  /* ngInject */
  function PostOfficeTesterController(postOfficeService) {
    // public api
    var postOfficeTesterVM = this;
    postOfficeTesterVM.test = postOfficeService.test;
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
      controllerAs: 'stateToggleVM',
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
    var stateToggleVM = this;
    stateToggleVM.turnOn = turnOn;
    stateToggleVM.turnOff = turnOff;
    stateToggleVM.getCurrentState = getCurrentState;
    stateToggleVM.isOn = isOn;
    stateToggleVM.isOff = isOff;

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
      controllerAs: 'iframeContentVM',
      bindToController: true,
      templateUrl: 'static/templates/iframe-content-template.html'
    };
  }


  function IFrameContentController() {
    var iframeContentVM = this;
  }
  
})();
(function () {
  
  'use strict';
  
  angular
    .module('icontent.app.IframeApp', [
      'icontent.features.IFrameContent'
    ]);
  
})();