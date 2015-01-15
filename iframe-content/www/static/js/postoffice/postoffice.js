(function () {
  
  'use strict';
  
  angular
    .module('PostOffice', [])
    .provider('postOffice', PostOfficeProvider);


  function PostOfficeProvider() {
    // variables
    var _currentWindow = null,
        _recipientWindow = null,
        _recipientDomain = '',
        _name = '';

    // public api
    var factory = {};
    factory.$get = PostOffice;

    // getters/setters
    factory.name = function(value) {
      if (!arguments.length) return _name;
      _name = value;
      return factory;
    };
    
    factory.currentWindow = function(value) {
      if (!arguments.length) return _currentWindow;
      _currentWindow = value;
      return factory;
    };
    
    factory.recipientWindow = function(value) {
      if (!arguments.length) return _recipientWindow;
      _recipientWindow = value;
      return factory;
    };
    
    factory.recipientDomain = function(value) {
      if (!arguments.length) return _recipientDomain;
      _recipientDomain = value;
      return factory;
    };

    return factory;
  }


  /* ngInject */
  function PostOffice($q) {
    // vars
    var _name = this.name,
        _currentWindow = this.currentWindow,
        _recipientWindow = this.recipientWindow,
        _recipientDomain = this.recipientDomain,
        _deferred = $q.defer(),
        _hasPromiseResolved = false;

    if(!_currentWindow) {
      throw new Error(getMissingParamErrorMessage('currentWindow'));
    }

    if(!_recipientWindow) {
      throw new Error(getMissingParamErrorMessage('recipientWindow'));
    }

    if(!_recipientDomain) {
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
      console.log('_recipientDomain: ', _recipientDomain);
      console.log('_recipientWindow: ', _recipientWindow);

      if(_recipientWindow) {
        _recipientWindow.postMessage(message, _recipientDomain);

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
      if(event.origin !== _recipientDomain) {
        return;
      }

      _deferred.resolve();
    }


    // init
    init();


    return _service;
  }

  
})();