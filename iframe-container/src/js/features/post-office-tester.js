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