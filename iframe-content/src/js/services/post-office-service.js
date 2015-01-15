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
    postOfficeConfigProvider.setName('icontentPostOffice');
    postOfficeConfigProvider.setRecipientDomain('http://container.iframe-test.com:3200');
    postOfficeConfigProvider.setRecipientWindow($windowProvider.$get().parent);
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