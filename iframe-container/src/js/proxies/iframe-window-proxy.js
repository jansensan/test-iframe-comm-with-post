(function () {
  
  'use strict';
  
  
  angular
    .module('icontainer.proxies.IframeWindowProxy', [])
    .constant('CHILD_DOMAIN', 'content.iframe-test.com')
    .factory('iframeWindowProxy', IframeWindowProxy);


  /* ngInject */
  function IframeWindowProxy(CHILD_DOMAIN) {
    // public api
    var _proxy = {};
    _proxy.test = test;

    // private methods
    function test() {
      console.log('--- icontainer.proxies.IframeWindowProxy:test ---');
      console.log('CHILD_DOMAIN: ' + (CHILD_DOMAIN));
    }

    return _proxy;
  }
  
})();