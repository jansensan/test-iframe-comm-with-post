(function () {
  
  'use strict';
  
  angular
    .module('icontent.services.PostOfficeService', [
      'PostOffice'
    ])
    .factory('postOfficeService', PostOfficeService);


  /* ngInject */
  function PostOfficeService($window, postOffice) {
    // init post office
    postOffice.init({
      name: 'icontentPostOffice',
      currentWindow: $window,
      recipientWindow: $window.parent,
      recipientDomain: 'http://container.iframe-test.com:3200'
    });

    // public api
    var _service = {};
    _service.test = test;

    // private methods
    function test() {
      console.log('--- icontent.services.PostOfficeService:test ---');
      postOffice.send('hello parent');
    }

    return _service;
  }
  
})();