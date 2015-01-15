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