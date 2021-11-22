// options
let logNetworkTraffic = false;
let devToolsInit = false;

// send message handler
const sendDTMessage = (type, message, meta) => {
  const types = ["console", "networkRequest", "networkResponse", "init", "heartbeat"];
  if (window.opener && types.includes(type)) {
    window.opener.postMessage({ type, message, timestamp: Date.now(), meta }, "*");
  }
};

// console.log handler
const _dtLog = console.log.bind(console);
console.log = (...args) => {
  _dtLog(...args);
  const type = "console";
  const meta = {type: "log"}
  sendDTMessage(type, args, meta);
};

// console.warn handler
const _dtWarn = console.warn.bind(console);
console.warn = (...args) => {
  _dtWarn(...args);
  const type = "console";
  const meta = {type: "warn"}
  sendDTMessage(type, args, meta);
};

// console.error handler
const _dtError = console.error.bind(console);
console.error = (...args) => {
  _dtError(...args);
  const type = "console";
  const meta = {type: "error"}
  sendDTMessage(type, args, meta);
};

// NETWORK API FEATURE - NOT READY YET
// network API retrieval logging - future release
// const _dtFetch = fetch.bind(this);
// fetch = (resource, init = []) => {
//   if (logNetworkTraffic) {
//     if (sendDTMessage) {
//       sendDTMessage("networkRequest", { resource, init });
//     }
//     // fetch the resource for logging
//     _dtFetch(resource, init)
//       .then((res) => res.json())
//       .then((res) => {
//         if (
//           init["headers"] &&
//           init["headers"]["Content-Type"] === "application/json"
//         ) {
//           sendDTMessage("networkResponse", res);
//         }
//       });
//   }
//   // fetch the resource again and return the promise
//   return _dtFetch(resource, init);
// };

// handle incoming messages
if (!devToolsInit) {
  window.addEventListener("message", (event) => {
    const { data } = event;
    if (data.init && !devToolsInit) {
      sendDTMessage("init", "SUCCESS");
      console.log("starting devtools");
      devToolsInit = true;
    }
    if (data.options) {
      data.options.forEach((option) => {
        switch (option) {
          case "payload":
            logPayloadTraffic = true;
            break;
          default:
            break;
        }
      });
    }
    if (data.heartbeat) {
      sendDTMessage("heartbeat", "Heartbeat Recieved")
    }
    return;
  });
}

// queue up a message to be sent indicating the JS has been loaded
console.log("DevTools JS loaded");
