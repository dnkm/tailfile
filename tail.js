const express = require('express'),
	app = express(),
	path = require('path'),
	server = require('http').Server(app),
	io = require('socket.io')(server),
	Tail = require('tail').Tail;

let options = { separator: /[\r]{0,1}\n/, fromBeginning: false, fsWatchOptions: {}, follow: true, logger: console };
tail = new Tail('./test', options);

// Add a basic route – index page
app.use(express.static(path.join(__dirname, '.')));
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

var tails = {};

io.on('connection', (socket) => {
	tail.on('line', (data) => socket.emit('line', data));
});

// Bind to a port
server.listen(3005, () => {
	console.log('running on localhost:' + 3005);
});
