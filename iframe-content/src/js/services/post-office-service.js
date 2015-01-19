(function () {
  
  'use strict';
  
  angular
    .module('icontent.services.PostOfficeService', [
      'PostOffice'
    ])
    .factory('postOfficeService', PostOfficeService);


  /* ngInject */
  function PostOfficeService($rootScope, $window, postOffice, PostOfficeEvents) {
    // init post office
    postOffice.init({
      name: 'icontentPostOffice',
      currentWindow: $window,
      recipientWindow: $window.parent,
      recipientDomain: 'http://container.iframe-test.com:3200'
    });
    $rootScope.$on(PostOfficeEvents.MESSAGE_RECEIVED, onMessageReceived);

    // public api
    var _service = {};
    _service.test = test;

    // private methods
    function test() {
      postOffice.send('hello parent');
    }

    // event handlers
    function onMessageReceived(event, data) {
      console.log('--- icontent.services.PostOfficeService:onMessageReceived ---');
      console.log('message: ', data);
    }

    return _service;
  }
  
})();