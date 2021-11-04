// options
let logNetworkTraffic = false;
let devToolsInit = false;

// send message handler
const sendDTMessage = (type, message) => {
  const types = ["console", "networkRequest", "networkResponse", "init"];
  if (window.opener && types.includes(type)) {
    window.opener.postMessage({ type, message, timestamp: Date.now() }, "*");
  }
};

// console.log handler
const _dtLog = console.log.bind(console);
console.log = (...args) => {
  _dtLog(`DTLOG: ${args}`);
  const type = "console";
  sendDTMessage(type, args);
};

const _dtFetch = fetch.bind(this);
fetch = (resource, init = []) => {
  if (logNetworkTraffic) {
    if (sendDTMessage) {
      sendDTMessage("networkRequest", { resource, init });
    }
    // fetch the resource for logging
    _dtFetch(resource, init)
      .then((res) => res.json())
      .then((res) => {
        if (
          init["headers"] &&
          init["headers"]["Content-Type"] === "application/json"
        ) {
          sendDTMessage("networkResponse", res);
        }
      });
  }
  // fetch the resource again and return the promise
  return _dtFetch(resource, init);
};

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
    return;
  });
}

// queue up a message to be sent indicating the JS has been loaded
console.log("DevTools JS loaded");
