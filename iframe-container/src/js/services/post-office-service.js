(function () {
  
  'use strict';
  
  angular
    .module('icontainer.services.PostOfficeService', [
      'PostOffice'
    ])
    .factory('postOfficeService', PostOfficeService);


  /* ngInject */
  function PostOfficeService($rootScope, $window, postOffice, PostOfficeEvents) {
    // init post office
    postOffice.init({
      name: 'icontainerPostOffice',
      currentWindow: $window,
      recipientWindow: document.getElementById('iframeContent').contentWindow,
      recipientDomain: 'http://content.iframe-test.com:1600'
    });
    $rootScope.$on(PostOfficeEvents.MESSAGE_RECEIVED, onMessageReceived);

    // public api
    var _service = {};
    _service.test = test;

    // private methods
    function test() {
      postOffice.send('hello child');
    }

    // event handlers
    function onMessageReceived(event, data) {
      console.log('--- icontainer.services.PostOfficeService:onMessageReceived ---');
      console.log('message: ', data);
    }

    return _service;
  }
  
})();