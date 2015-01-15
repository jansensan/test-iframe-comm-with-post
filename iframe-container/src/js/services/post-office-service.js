(function () {
  
  'use strict';
  
  angular
    .module('icontainer.services.PostOfficeService', [
      'PostOffice'
    ])
    .config(PostOfficeConfig)
    .factory('postOfficeService', PostOfficeService);


  /* ngInject */
  function PostOfficeConfig($windowProvider, postOfficeConfigProvider) {
    var win = $windowProvider.$get(),
        p = postOfficeConfigProvider;

    p.setName('icontainerPostOffice');
    p.setCurrentWindow(win);
    p.setRecipientWindow(win.frames['iframeContent'].contentWindow);
    p.setRecipientDomain('http://content.iframe-test.com:1600');
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