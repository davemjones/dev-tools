# Client Library README
This README only serves as a guide for developers wishing to extend the functionality of this plugin.  Additional work to consume any changes will also need to be made in the DevTools application and will not be covered here.

## Concept
The current architecture to send information from the client application to the DevTools application utilizes the `window.opener.postMessage / window.open.postMessage` browser API. This restricts message passing between parent windows and windows the parent spawns.  External tabs cannot access this information.  This model breaks if you need to "listen" for messages on an application that can't be spawned directly from the DevTools application. For example, if your application goes through an authentication wall that also spawns the target application in a new window, DevTools will not have access to any messages from the target application.

To capture data from the target application, we use the ability to redirect certain browsers API to "skim" off any relevant data and then forward the call to the native API.  This is a common practice with javascript librarys.

Console.log Example:
```javascript
// Create a variable _dtLog that will point to the browsers console.log method.
const _dtLog = console.log.bind(console);

// redefine the browsers console.log method.  This will NOT change the above variable.
console.log = (...args) => {
  // Call the original console.log and pass all variables along.
  _dtLog(...args);

  // Do anything with the arguments such as pass to the DevTools application.
  // sendDTMessage is a custom method that uses window.opener.postMessage 
  // to package and send data to DevTools.
  const type = 'console';
  const meta = { type: 'log' };
  sendDTMessage(type, args, meta);
};
```

## Current Implementation
The following items can be captured and forwarded to the DevTools application:
- `console.log()`
- `console.warn()`
- `console.error()`
- Generic "error" events on the window - Errors that aren't explicitly thrown with a console are covered under this.  The error has to be part of the Window scope.
- Fetch API - most modern REST API calls use fetch.  The client library only sends information for requests that don't have a 200 response code.

## Heartbeat
The client also has a heartbeat feature that will respond with "Heartbeat Received".

## Roadmap
- Add triggers to enable / disable certain capture events on-the-fly.  Disable all capture activity if the DevTools application isn't running.  Only load the client library if a parameter exists in the URL? 
- Capture all network traffic metadata