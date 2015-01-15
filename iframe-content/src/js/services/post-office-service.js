(function () {
  
  'use strict';
  
  angular
    .module('icontent.services.PostOfficeService', [
      'PostOffice'
    ])
    .config(PostOfficeConfig)
    .factory('postOfficeService', PostOfficeService);


  /* ngInject */
  function PostOfficeConfig($windowProvider, postOfficeProvider) {
    var win = $windowProvider.$get(),
        p = postOfficeProvider;

    p.name = 'icontentPostOffice';
    p.currentWindow = win;
    p.recipientWindow = win.parent;
    p.recipientDomain = 'http://container.iframe-test.com:3200';
  }

  /* ngInject */
  function PostOfficeService(postOffice) {
    // public api
    var _service = {};
    _service.test = test;

    // private methods
    function test() {
      postOffice.send('hello post office');
    }

    return _service;
  }
  
})();