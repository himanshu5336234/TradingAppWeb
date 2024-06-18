function CreateWebWorker() {
  const workerCode = `
    let socket;
    let webWorkerCalculation;
      self.addEventListener('message', function (event) {
        const { type, payload } = event.data;
        if( type === 'init') {
            const { calculationFunction } = payload;
            webWorkerCalculation = new Function('return ' + calculationFunction)();
        }
        
        if (type === 'websocket') {
          const { url } = payload;
          socket = new WebSocket(url);

          socket.onopen = function () {
            self.postMessage({ type: 'websocket', message: 'Socket connection opened', action: 'open', status: 'open' });
          };
  
          socket.onmessage = function (event) {
            const data = event.data;
            if(webWorkerCalculation) {
                const result = webWorkerCalculation(data);
                self.postMessage({ type: 'websocket', data, result, action: 'onmessage', status: 'open'  });
            } else {
                self.postMessage({ type: 'websocket', data, action: 'onmessage', status: 'open'  });
            }
          };
  
          socket.onerror = function (error) {
            self.postMessage({ type: 'websocket', error: error, action: 'onerror', status: 'error'  });
          };
  
          socket.onclose = function () {
            self.postMessage({ type: 'websocket', message: 'Socket connection closed', action: 'onclose', status: 'close' });
          };
        } else if (type === 'api') {
          const { url, options } = payload;
          
          // Perform heavy API call or any other task
          fetch(url, options)
            .then(response => response.json())
            .then(data => {
              self.postMessage({ type: 'api', data });
            })
            .catch(error => {
              self.postMessage({ type: 'api', error: error.message });
            });
        } else if (type === 'sendData') {
            const { data } = payload;
            if (socket && socket.readyState === WebSocket.OPEN) {
              socket.send(data);
            } else {
              self.postMessage({ type: 'sendDataError', message: 'Socket connection is not open' });
            }
          } else if (type === 'close') {
            socket.close()
          } else if (type === 'pushCalFunc') {
            webWorkerCalculation = calcutationFunction;
          }
      });
    `;

  const blob = new Blob([workerCode], { type: "application/javascript" });
  const workerUrl = URL.createObjectURL(blob);

  const worker = new Worker(workerUrl);

  return {
    worker,
    setCalculationFunction: (calculationFunction) => {
      worker.postMessage({
        type: "init",
        payload: {
          calculationFunction: calculationFunction.toString()
        }
      });
    }
  };
}

export default CreateWebWorker;
