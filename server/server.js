//var http = require('http');
var restify = require('restify');

var ecstatic = require('ecstatic');

var server = restify.createServer();
var io = require('socket.io');
var socket;
server.pre(ecstatic({ root: __dirname + '/public'}));
server.use(restify.queryParser());

server.get("/initialize", function(request, response, next){
	
	if(socket)
	{
		console.log('initialize request received');
		//send to all sockets but the new one
		//socket.broadcast.emit('news', { socket: 'initialized' });
		
		//send only to the newly created socket
		//socket.emit('news', {socket: 'initialized'});
		
		//send to all sockets
		io.sockets.emit('news', { socket: 'initialized' });
	}
	else
	{
		console.log('socket not initialized');
	}
	response.writeHead(200, {});
	response.write('I love you baby!');
	response.end();
	next();
});

server.get("/hello", function(request, response, next){
	console.log('request received from client');
	response.writeHead(200, {});
	response.write('Hello world!');
	response.end({});
	next();	
});

server.get("/katherinebaby", function(request, response, next){
	console.log('Do you love me?');
	response.writeHead(200, {});
	response.write('I love you baby!');
	response.end();
	response.send();
	next();	
});

server.listen(8080);

io.listen(server).on('connection', function(sock){
	console.log('socket connected');
	if(sock)
	{
		socket = sock;
		sock.emit('news', { hello: 'world' });
		sock.on('my other event', function(data)
		{	
			console.log(data);
		});
	}	
});

console.log('Server started and listening');