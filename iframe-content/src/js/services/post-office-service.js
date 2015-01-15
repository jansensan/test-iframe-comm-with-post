(function () {
  
  'use strict';
  
  angular
    .module('icontent.services.PostOfficeService', [
      'PostOffice'
    ])
    .config(PostOfficeConfig)
    .factory('postOfficeService', PostOfficeService);


  /* ngInject */
  function PostOfficeConfig($windowProvider, postOfficeConfigProvider) {
    var win = $windowProvider.$get(),
        p = postOfficeConfigProvider;

    p.setName('icontentPostOffice');
    p.setCurrentWindow(win);
    p.setRecipientWindow(win.parent);
    p.setRecipientDomain('http://container.iframe-test.com:3200');
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