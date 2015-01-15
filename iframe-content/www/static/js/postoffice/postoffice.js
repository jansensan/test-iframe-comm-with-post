(function () {
  
  'use strict';
  
  angular
    .module('PostOffice', [])
    .provider('postOfficeConfig', PostOfficeConfigProvider)
    .factory('postOffice', PostOffice);


  function PostOfficeConfigProvider() {
    // variables
    var _recipientWindow = null,
        _recipientDomain = '',
        _name = '';

    // private methods
    function setName(value) {
      _name = value;
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
        window: _recipientWindow,
        domain: _recipientDomain
      };
    }

    // public api
    return {
      setName: setName,
      setRecipientWindow: setRecipientWindow,
      setRecipientDomain: setRecipientDomain,
      $get: getProvider
    };
  }


  /* ngInject */
  function PostOffice($q, postOfficeConfig) {
    // vars
    var _window = postOfficeConfig.window,
        _domain = postOfficeConfig.domain,
        _name = postOfficeConfig.name,
        _deferred = $q.defer(),
        _hasPromiseResolved = false;

    if(!_window) {
      throw new Error(getMissingParamErrorMessage('window'));
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
      _window.addEventListener("message", onMessageReceived);
    }

    function disable() {
      // remove event listeners
      _window.removeEventListener("message", onMessageReceived);
    }

    function send(message) {
      console.log('--- PostOffice:send ---');
      console.log('message: ', message);
      console.log('_domain: ', _domain);
      console.log('_window: ', _window);

      if(_window) {
        _window.postMessage(message, _domain);

      } else {
        throw new Error('Error at PostOffice:send. The variable "window" is potentially undefined.');
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