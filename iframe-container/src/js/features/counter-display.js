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