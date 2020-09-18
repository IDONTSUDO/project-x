const uWS = require('uWebSockets.js');
const port = 9001;

const app = uWS.App().ws('/*', {
  compression: 0,
  maxPayloadLength: 16 * 1024 * 1024,
  idleTimeout: 10,
  open: (ws) => {
    ws.subscribe('broadcast');
  },
  message: (ws, message, isBinary) => {
    ws.publish('broadcast', message, isBinary);
  },
  drain: (ws) => {

  },
  close: (ws, code, message) => {

  }
}).any('/*', (res, req) => {
  res.end('Nothing to see here!');
}).listen(port, (token) => {
  if (token) {
    console.log('Listening to port ' + port);
  } else {
    console.log('Failed to listen to port ' + port);
  }
});