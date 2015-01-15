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