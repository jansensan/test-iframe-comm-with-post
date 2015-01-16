(function () {
  
  'use strict';
  
  angular
    .module('icontainer.services.PostOfficeService', [
      'PostOffice'
    ])
    .factory('postOfficeService', PostOfficeService);


  /* ngInject */
  function PostOfficeService($window, postOffice) {
    console.log('--- icontainer.services.PostOfficeService ---');

    // init post office
    var childWindow = document.getElementById('iframeContent').contentWindow
    console.log('childWindow: ', childWindow);
    postOffice.init({
      name: 'icontainerPostOffice',
      currentWindow: $window,
      recipientWindow: childWindow,
      recipientDomain: 'http://content.iframe-test.com:1600'
    });

    // public api
    var _service = {};
    _service.test = test;

    // private methods
    function test() {
      console.log('--- icontainer.services.PostOfficeService:test ---');
      postOffice.send('hello child');
    }

    return _service;
  }
  
})();