(function () {
  
  'use strict';
  
  angular
    .module('icontainer.services.PostOfficeService', [
      'PostOffice'
    ])
    .config(PostOfficeConfig)
    .factory('postOfficeService', PostOfficeService);


  /* ngInject */
  function PostOfficeConfig($windowProvider, postOfficeProvider) {
    var win = $windowProvider.$get(),
        p = postOfficeProvider;

    p.name = 'icontainerPostOffice';
    p.currentWindow = win;
    p.recipientWindow = win.frames['iframeContent'].contentWindow;
    p.recipientDomain = 'http://content.iframe-test.com:1600';
  }

  /* ngInject */
  function PostOfficeService(postOffice) {
    // public api
    var _service = {};
    _service.test = test;

    // private methods
    function test() {
      postOffice.send('hello child');
    }

    return _service;
  }
  
})();