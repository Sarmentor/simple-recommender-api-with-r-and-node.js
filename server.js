var net = require('net');

function start(){
var R = new net.Socket();

R.connect(<R server port>, '<R server address>', function(){
console.log('Connected to R');
});

R.on('close', function(){
server.close();
R.destroy();
console.log('Connection to R Closed!');
console.log('Server temporarely closed to restart!');
start();
});

var server = net.createServer(function(socket) {
      socket.on('data', function(data) {
    	console.log('Data received from socket: ' + data);
        	R.on('data', function(dataR){
			console.log('Data from R: ' + dataR);
			socket.write(dataR + '\r\n');
			socket.pipe(socket);
      		});
	console.log('Data being sent to R!')
	R.write(data + '\r\n');
   });
});

console.log('Going to Start server on port <Node.js port>!');
server.listen(<Node.js port>, function(){
console.log('Server is listening on port <Node.js port>!');
});
server.on('error', function(e){
  if (e.code == 'EADDRINUSE') {
    	console.log('Address in use, closing and restarting server...');
	R.destroy();
	start();
  }
});
}
start();

