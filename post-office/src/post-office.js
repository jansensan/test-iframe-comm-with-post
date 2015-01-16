(function () {
  
  'use strict';
  
  angular
    .module('PostOffice', [])
    .factory('postOffice', PostOffice);


  /* ngInject */
  function PostOffice($q) {
    // vars
    var _name = '',
        _currentWindow = null,
        _recipientWindow = null,
        _recipientDomain = '',
        _deferred = $q.defer(),
        _hasPromiseResolved = false;

    // public api
    var _service = {};
    _service.init = init;
    _service.disable = disable;
    _service.enable = enable;
    _service.getName = getName;
    _service.getPromise = getPromise;
    _service.send = send;


    // private methods
    function init(config) {
      console.log('--- PostOffice:init ---');

      // exit quickly if no config is provided
      if(!config) {
        throw new Error('No config object was provided to initialize the PostOffice.');
        return;

      // set vars
      } else {
        if(config.name) {
          _name = config.name;
        }
        if(config.currentWindow) {
          _currentWindow = config.currentWindow;
        }
        if(config.recipientWindow) {
          _recipientWindow = config.recipientWindow;
        }
        if(config.recipientDomain) {
          _recipientDomain = config.recipientDomain;
        }
      }

      console.log('_name: ' + (_name));
      console.log('_currentWindow: ', _currentWindow);
      console.log('_recipientWindow: ', _recipientWindow);
      console.log('_recipientDomain: ' + (_recipientDomain));

      // enable
      enable();
    }

    function resetDeferred() {
      _hasPromiseResolved = false;
      _deferred = $q.defer();
    }

    function enable() {
      // check for missing things
      if(!_currentWindow) {
        throw new Error(getMissingParamErrorMessage('_currentWindow'));
      }

      if(!_recipientWindow) {
        throw new Error(getMissingParamErrorMessage('_recipientWindow'));
      }

      if(!_recipientDomain) {
        throw new Error(getMissingParamErrorMessage('_recipientDomain'));
      }

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


    return _service;
  }

  
})();