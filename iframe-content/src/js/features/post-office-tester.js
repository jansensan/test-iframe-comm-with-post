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