const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const port = 1883;

server.listen(port, function () {
  console.log(`MQTT server started and listening on port ${port}`);
});

aedes.on('client', function (client) {
  console.log('Client Connected: ' + client.id);
});

aedes.on('publish', function (packet, client) {
  console.log('Received message: ', packet.payload.toString());
});

aedes.on('subscribe', function (subscriptions, client) {
  console.log('Client subscribed: ', subscriptions);
});

aedes.on('clientDisconnect', function (client) {
  console.log('Client Disconnected: ' + client.id);
});
