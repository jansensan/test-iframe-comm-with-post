(function () {
  
  'use strict';
  
  angular
    .module('PostOffice', [])
    .provider('postOfficeConfig', PostOfficeConfigProvider)
    .factory('postOffice', PostOffice);


  function PostOfficeConfigProvider() {
    // variables
    var _currentWindow = null,
        _recipientWindow = null,
        _recipientDomain = '',
        _name = '';

    // private methods
    function setName(value) {
      _name = value;
    }

    function setCurrentWindow(value) {
      _currentWindow = value;
    }

    function setRecipientWindow(value) {
      _recipientWindow = value;
    }

    function setRecipientDomain(value) {
      _recipientDomain = value;
    }

    function getProvider() {
      return {
        name: _name,
        currentWindow: _currentWindow,
        recipientWindow: _recipientWindow,
        domain: _recipientDomain
      };
    }

    // public api
    return {
      setName: setName,
      setCurrentWindow: setCurrentWindow,
      setRecipientWindow: setRecipientWindow,
      setRecipientDomain: setRecipientDomain,
      $get: getProvider
    };
  }


  /* ngInject */
  function PostOffice($q, postOfficeConfig) {
    // vars
    var _currentWindow = postOfficeConfig.currentWindow,
        _recipientWindow = postOfficeConfig.recipientWindow,
        _domain = postOfficeConfig.domain,
        _name = postOfficeConfig.name,
        _deferred = $q.defer(),
        _hasPromiseResolved = false;

    if(!_currentWindow) {
      throw new Error(getMissingParamErrorMessage('currentWindow'));
    }

    if(!_recipientWindow) {
      throw new Error(getMissingParamErrorMessage('recipientWindow'));
    }

    if(!_domain) {
      throw new Error(getMissingParamErrorMessage('domain'));
    }


    // public api
    var _service = {};
    _service.enable = enable;
    _service.disable = disable;
    _service.getName = getName;
    _service.getPromise = getPromise;
    _service.send = send;


    // private methods
    function init() {
      enable();
    }

    function resetDeferred() {
      _hasPromiseResolved = false;
      _deferred = $q.defer();
    }

    function enable() {
      // add event listeners
      _currentWindow.addEventListener("message", onMessageReceived);
    }

    function disable() {
      // remove event listeners
      _currentWindow.removeEventListener("message", onMessageReceived);
    }

    function send(message) {
      console.log('--- PostOffice:send ---');
      console.log('message: ', message);
      console.log('_domain: ', _domain);
      console.log('_recipientWindow: ', _recipientWindow);

      if(_recipientWindow) {
        _recipientWindow.postMessage(message, _domain);

      } else {
        throw new Error('Error at PostOffice:send. The recipient window is potentially undefined.');
      }
    }

    function getName() {
      return _name;
    }

    function getPromise() {
      return _deferred.promise;
    }

    function getMissingParamErrorMessage(paramName) {
      var message = 'The ' + paramName + ' parameter is not defined';
      if(_name !== '') {
        message.concat(' for the PostOffice named ' + _name + '.');
      } else {
        message.concat('.')
      }
      return message;
    }


    // event handlers
    function onMessageReceived(event) {
      // ignore messages not sent from expected domain
      if(event.origin !== _domain) {
        return;
      }

      _deferred.resolve();
    }


    // init
    init();


    return _service;
  }

  
})();