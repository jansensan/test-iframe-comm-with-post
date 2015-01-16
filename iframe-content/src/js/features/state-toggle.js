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