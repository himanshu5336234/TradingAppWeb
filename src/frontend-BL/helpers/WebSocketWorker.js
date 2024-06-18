export const workerCode = `
let webSocket = null;
let lastSentMessage = null;
let retryCount = 0;
let url = null;
let intervalID = null; 
let onTabSwitchDisconnect = false; 
self.onmessage = function (event) {
  const { type, payload } = event.data;

  switch (type) {
    case 'CONNECT':
      url = payload.url;
      connect(url);
      break;
    case 'SEND':
      send(payload.message);
      break;
    case 'DISCONNECT': 
      disconnect();
      break;
    case 'RECONNECT':
      reconnect();
      break;
    case 'HARDDISCONNECT':
      hardDisconnect();
      break;
    case 'UPDATELASTMESSAGE':
      updateLastMessage(payload);
      break;
    case "TAB_SWITCH_IN_ACTIVE":{
      intervalID = setInterval(()=>{      
        onTabSwitchDisconnect=true;      
        disconnect();
        clearInterval(intervalID); // Clear interval after setting
      }, 1000*5*60); 
      break;
    }
    case  "TAB_SWITCH_ACTIVE":{   
      if(onTabSwitchDisconnect){
        onTabSwitchDisconnect=false; 
        self.postMessage({ type: 'message', payload: JSON.stringify({data:{e:"RE_CONNECT"}}) });
      }
      clearInterval(intervalID); // Clear interval in tab switch active case
      break;
    }
  }
};

function updateLastMessage(payload) {
  if(payload) {
    lastSentMessage = payload
  }
}

function disconnect() {
  if(webSocket) {
    webSocket.close(1000);
    self.postMessage({ type: 'disconnected' });
  }
}

function hardDisconnect() {
  if(webSocket) {
    clearInterval(intervalID)
    webSocket.close(1000);
    self.postMessage({ type: 'disconnected' });
    lastSentMessage = null;
  }
}

function connect(url) {
  webSocket = new WebSocket(url);
  webSocket.onopen = handleOpen;
  webSocket.onmessage = handleMessage;
  webSocket.onclose = handleClose;
  webSocket.onerror = handleError;
}

function send(message) {
  lastSentMessage = message;
  if (webSocket && webSocket.readyState === WebSocket.OPEN) {
    webSocket.send(message);
  }
}

function handleOpen() {
  if (lastSentMessage) {
    webSocket.send(lastSentMessage);
  }
  retryCount = 0; // Reset retry count on successful connection
  self.postMessage({ type: 'open' });
}

function handleMessage(event) {
  self.postMessage({ type: 'message', payload: event.data });
}

function handleClose(event) {
  if (event.code !== 1000) {
    attemptReconnect();
  }
  self.postMessage({ type: 'close' });
}

function handleError(error) {
  self.postMessage({ type: 'error', payload: error });
}

function reconnect() {
  if (retryCount < 5) {
    retryCount++;
    setTimeout(() => {
      connect(url);
    }, Math.pow(2, retryCount) * 500);
  } else {
    self.postMessage({ type: 'maxRetries' });
  }
}

function attemptReconnect() {
  if (retryCount < 5) {
    retryCount++;
    setTimeout(() => {
      connect(url);
    }, Math.pow(2, retryCount) * 1000);
  } else {
    self.postMessage({ type: 'maxRetries' });
  }
}`;
