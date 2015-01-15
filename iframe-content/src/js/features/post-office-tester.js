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