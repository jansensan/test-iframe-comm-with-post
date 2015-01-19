(function () {
  
  'use strict';
  
  angular
    .module('PostOffice', [])
    .constant('PostOfficeEvents', getPostOfficeEvents())
    .factory('postOffice', PostOffice);


  function getPostOfficeEvents() {
    return {
      MESSAGE_SENT: 'PostOffice:MESSAGE_SENT',
      RECIPIENT_CONFIRMATION_CONFIRMED: 'PostOffice:RECIPIENT_CONFIRMATION_CONFIRMED',
      MESSAGE_RECEIVED: 'PostOffice:MESSAGE_RECEIVED'
    };
  }


  /* ngInject */
  function PostOffice($rootScope, PostOfficeEvents) {
    // vars
    var _name = '',
        _currentWindow = null,
        _recipientWindow = null,
        _recipientDomain = '';

    // public api
    var _service = {};
        _service.init = init;
        _service.disable = disable;
        _service.enable = enable;
        _service.send = send;
        _service.getName = getName;


    // private methods
    function init(config) {
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

      // enable
      enable();
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
      if(_recipientWindow) {
        dispatchMessageSent();
        _recipientWindow.postMessage(message, _recipientDomain);

      } else {
        throw new Error('Error at PostOffice:send: The recipient window is potentially undefined.');
      }
    }

    function dispatchMessageSent() {
      $rootScope.$broadcast(PostOfficeEvents.MESSAGE_SENT);
    }

    function confirmMessageReceptionToSource(source) {
      // FIXME: figure out this error: "Uncaught SyntaxError: Failed to execute 'postMessage' on 'Window': Invalid target origin '' in a call to 'postMessage'."
      // if(source && source.postMessage) {
      //   source.postMessage(PostOfficeEvents.RECIPIENT_CONFIRMATION_CONFIRMED);
      // } else {
      //   console.warn('Issue at PostOffice:confirmMessageReceptionToSource: It was impossible to confirm message reception to source window.');
      // }
    }

    function dispatchRecipientReceptionConfirmation() {
      $rootScope.$broadcast(PostOfficeEvents.RECIPIENT_CONFIRMATION_CONFIRMED);
    }

    function dispatchMessageReceived(message) {
      $rootScope.$broadcast(
        PostOfficeEvents.MESSAGE_RECEIVED,
        {'message': message}
      );
    }

    function getName() {
      return _name;
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

      // exit quickly if message is simply to confirm reception of send
      // this dispatches to whoever listens to the events the service dispatches
      if(event.data === PostOfficeEvents.RECIPIENT_CONFIRMATION_CONFIRMED) {
        dispatchRecipientReceptionConfirmation();
        return;
      }

      // inform source that message is received
      // this is internal, returns a message to the sender directly
      confirmMessageReceptionToSource(event.source);

      // dispatch reception event
      dispatchMessageReceived(event.data);
    }


    return _service;
  }

  
})();