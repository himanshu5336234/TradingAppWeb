import EventEmitter from "eventemitter3";
import { workerCode } from "./WebSocketWorker";

class WebSocketModule extends EventEmitter {
  constructor() {
    super();
    this.webSocket = null;
    this.lastSentMessage = null;
    this.retryCount = 0;
    this.emitTimeout = null;
    this.debounceDuration = 100;
    this.emitterType = "event";
    this.eventsStack = {};
    this.debounceStartsAfter = 1000; // 2 seconds
    this.useDebounce = false;

    if (typeof Worker !== "undefined") {
      const blob = new Blob([workerCode], { type: "application/javascript" });
      const workerUrl = URL.createObjectURL(blob);
      this.worker = new Worker(workerUrl);
      this.worker.binaryType = "arraybuffer";
      this.worker.onmessage = this.handleWorkerMessage.bind(this);
    } else {
      console.warn("Web Workers are not supported in this browser. Falling back to normal WebSocket.");
    }
  }

  connect(url, timer = 100) {
    this.url = url;
    if (this.worker) {
      this.debounceDuration = timer;
      this.worker.postMessage({ type: "CONNECT", payload: { url } });
    } else {
      this.establishConnection();
    }
  }

  slowFeedby(time) {
    this.debounceDuration = time;
  }

  establishConnection() {
    this.webSocket = new WebSocket(this.url);
    this.webSocket.onopen = this.handleOpen.bind(this);
    this.webSocket.onmessage = this.handleMessage.bind(this);
    this.webSocket.onclose = this.handleClose.bind(this);
    this.webSocket.onerror = this.handleError.bind(this);
  }

  send(message) {
    this.lastSentMessage = message;
    if (this.worker) {
      this.worker.postMessage({ type: "SEND", payload: { message } });
    } else {
      if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
        this.webSocket.send(message);
      }
    }
  }

  async handleWorkerMessage(event) {
    // Received binary data from main thread
    // var data3 = JSON.parse(String.fromCharCode.apply(null, new Uint16Array(event.data)));
    // console.log(new DataView(event.data),"sfldnvelfknvkfsjvljsfnv");
    // const blob = new Blob([event.data.payload], { type: "text/plain" })
    // const data = await blob.arrayBuffer();
    // const uint8Array = new Uint8Array(data)
    // const decoder = new TextDecoder();

    // const str = decoder.decode(uint8Array);
    // console.log(str,uint8Array,"datadatadata")

    const { type, payload } = event.data;
    try {
      if (type !== "message") {
        this.emit(type, event);
      } else {
        // this.emit(type, payload);
        if (!this.useDebounce) {
          this.emit(type, payload);

          // Set a timer to start debouncing after the specified duration
          if (!this.debounceTimer) {
            this.debounceTimer = setTimeout(() => {
              this.useDebounce = true;
            }, this.debounceStartsAfter);
          }
          // Exit after sending the message without debounce
        } else {
          const parsedPayload = JSON.parse(payload);
          if (parsedPayload?.data?.e === "24hrMiniTicker") {
            this.emit(type, payload);
          }
          this.eventsStack[parsedPayload?.stream] = payload;
          if (this.emitTimeout) {
            clearTimeout(this.emitTimeout);
          }

          this.emitTimeout = setTimeout(() => {
            const valuesArray = Object.values(this.eventsStack);
            for (let i = 0; i < valuesArray.length; i++) {
              this.emit(type, valuesArray[i]);
            }
            // this.emit(type, JSON.stringify(valuesArray));
            this.eventsStack = {};
          }, this.debounceDuration);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  updateLastMessage(payload) {
    this.lastSentMessage = payload;
    this.worker.postMessage({ type: "UPDATELASTMESSAGE", payload });
  }

  handleOpen() {
    if (this.lastSentMessage) {
      this.webSocket.send(this.lastSentMessage);
    }
    this.retryCount = 0; // Reset retry count on successful connection
    this.emit("open");
  }

  handleMessage(event) {
    this.emit("message", event.data);
  }

  handleClose(event) {
    if (event.code !== 1000) {
      this.attemptReconnect(this.url);
    }
    this.emit("close");
  }

  handleError(error) {
    this.emit("error", error);
  }

  attemptReconnect(url) {
    if (this.retryCount < 5) {
      this.retryCount++;
      setTimeout(() => {
        this.establishConnection();
      }, Math.pow(2, this.retryCount) * 1000);
    } else {
      this.emit("maxRetries");
    }
  }

  windowTabChange({ payload }) {
    if (payload === "inactive") {
      this.worker.postMessage({ type: "TAB_SWITCH_IN_ACTIVE" });
    } else {
      this.worker.postMessage({ type: "TAB_SWITCH_ACTIVE" });
    }
  }

  disconnect() {
    if (this.worker) {
      this.worker.postMessage({ type: "DISCONNECT" });
    } else if (this.webSocket) {
      this.webSocket.close(1000);
    }
  }

  hardDisconnect() {
    if (this.worker) {
      this.worker.postMessage({ type: "HARDDISCONNECT" });
    } else if (this.webSocket) {
      this.webSocket.close(1000);
      this.lastSentMessage = null;
    }
  }

  reconnect() {
    if (this.worker) {
      this.worker.postMessage({ type: "RECONNECT" });
    } else if (this.webSocket) {
      this.attemptReconnect();
    }
  }
}

export default new WebSocketModule();
