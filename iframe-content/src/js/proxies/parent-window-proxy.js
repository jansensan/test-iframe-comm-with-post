(function () {
  
  'use strict';


  angular
    .module('icontent.proxies.ParentWindowProxy', [])
    .constant('PARENT_DOMAIN', 'container.iframe-test.com')
    .factory('parentWindowProxy', ParentWindowProxy);


  /* ngInject */
  function ParentWindowProxy(PARENT_DOMAIN) {
    // public api
    var _proxy = {};
    _proxy.test = test;

    // private methods
    function test() {
      console.log('--- icontent.proxies.ParentWindowProxy:test ---');
      console.log('PARENT_DOMAIN: ' + (PARENT_DOMAIN));
    }

    return _proxy;
  }
  
  
})();