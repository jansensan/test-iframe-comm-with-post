(function () {
  
  'use strict';


  angular
    .module('icontent.proxies.ParentWindowProxy', [])
    .constant('PARENT_DOMAIN', 'http://container.iframe-test.com:3200')
    .factory('parentWindowProxy', ParentWindowProxy);


  /* ngInject */
  function ParentWindowProxy(
    $window,
    PARENT_DOMAIN
  ) {

    // public api
    var parentWindow = $window.parent;
    var _proxy = {};
    _proxy.helloParent = helloParent;

    // private methods
    function init() {
      console.log('--- icontent.proxies.ParentWindowProxy:init ---');
      
      addEventListeners();
    }

    function addEventListeners() {
      $window.addEventListener("message", onMessageReceived);
    }

    function removeEventListeners() {
      $window.removeEventListener("message", onMessageReceived);
    }

    function postToParentWindow(data) {
      if(parentWindow) {
        parentWindow.postMessage(data, PARENT_DOMAIN);

      } else {
        console.error('Error at icontent.proxies.ParentWindowProxy:postToParentWindow. The variable "parentWindow" is potentially undefined.');
      }
    }

    function helloParent() {
      console.log('--- icontent.proxies.ParentWindowProxy:helloParent ---');
      postToParentWindow('hello parent');
    }

    // event handlers
    function onMessageReceived(event) {
      console.log('--- icontent.proxies.ParentWindowProxy:onMessageReceived ---');

      // ignore messages not sent from the parent's domain
      if(event.origin !== PARENT_DOMAIN) {
        return;
      }

      console.log('event.data: ', event.data);
    }

    // init
    init();

    return _proxy;
  }
  
  
})();