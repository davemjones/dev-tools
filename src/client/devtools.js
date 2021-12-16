/**
 * @file DevTools client library
 * @author David Jones
 * @version 0.1
 */

// initialization
let devToolsInit = false;

// hide postMessage arguments from security scanner
const wopm = (...args) => {
  window.opener.postMessage(...args);
};

// send message handler
const sendDTMessage = (type, message, meta) => {
  const types = [
    'console',
    'windowError',
    'networkRequest',
    'networkResponse',
    'init',
    'heartbeat'
  ];
  if (window.opener && types.includes(type)) {
    wopm({ type, message, timestamp: Date.now(), meta }, '*');
  }
};

// console.log handler
const _dtLog = console.log.bind(console);
console.log = (...args) => {
  _dtLog(...args);
  const type = 'console';
  const meta = { type: 'log' };
  sendDTMessage(type, args, meta);
};

// console.warn handler
const _dtWarn = console.warn.bind(console);
console.warn = (...args) => {
  _dtWarn(...args);
  const type = 'console';
  const meta = { type: 'warn' };
  sendDTMessage(type, args, meta);
};

// console.error handler
const _dtError = console.error.bind(console);
console.error = (...args) => {
  _dtError(...args);
  const type = 'console';
  const meta = { type: 'error' };
  sendDTMessage(type, args, meta);
};

// fetch api error handler
const _dtFetch = window.fetch.bind(window);
window.fetch = (...args) =>
  _dtFetch(...args).then(res => {
    if (!res.ok) {
      const message = {
        fetchArguments: JSON.stringify(args),
        headers: JSON.stringify(res.headers),
        status: res.status,
        statusText: res.statusText,
        type: res.type,
        url: res.url
      };
      const type = 'console';
      const meta = { type: 'error' };
      sendDTMessage(type, message, meta);
    }
    return res;
  });

// handle incoming messages
if (!devToolsInit) {
  window.addEventListener('message', event => {
    const { data } = event;
    if (data.init && !devToolsInit) {
      sendDTMessage('init', 'SUCCESS');
      console.log('starting devtools');
      devToolsInit = true;
    }

    if (data.heartbeat) {
      sendDTMessage('heartbeat', 'Heartbeat Received');
    }
  });

  // capture all generic error events on the window
  window.addEventListener('error', error => {
    const {
      colNo: columnNumber,
      error: internalError,
      filename,
      lineNo: lineNumber,
      currentTarget: { location }
    } = error;
    const sendMessage = {
      error: internalError.message,
      location: location.href,
      filename,
      lineNumber,
      columnNumber,
      stack: internalError.stack
    };
    sendDTMessage('windowError', sendMessage, { type: 'error' });
  });
}

// queue up a message to be sent indicating the JS has been loaded
console.log('DevTools Client loaded');
