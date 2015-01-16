(function () {
  
  'use strict';
  
  angular
    .module('icontent.services.PostOfficeService', [
      'PostOffice'
    ])
    .factory('postOfficeService', PostOfficeService);


  /* ngInject */
  function PostOfficeService($window, postOffice) {
    console.log('--- icontent.services.PostOfficeService ---');

    // init post office
    var parentWindow = $window.parent;
    console.log('parentWindow: ', parentWindow);
    postOffice.init({
      name: 'icontentPostOffice',
      currentWindow: $window,
      recipientWindow: parentWindow,
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