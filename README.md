# uws-with-on
uws superset who allow you to listen on event like with socket.io
(the code source work both in the browser and in NodeJS)

use is really easy :
(these sample uses the [socket.io-with-get.js](https://github.com/Drulac/socket.io-with-GET) superset too)

you can use it in the client :
```js
<!doctype html>
<html>
<head>
	<title>.</title>
	<script src="../socketWithOn.js"></script>
	<script src="socket.io-with-get.js"></script>
</head>
<body>
	<script>
	var socket = new WebSocket("ws://localhost:5000");

	socket.onopen = async function (event) {
		socket = new SocketWithOn(socket);
		socket = new Socket(socket);

		socket.on('name', (data, cb)=>{
			cb("My name is Jhon... Jhon Doe...");
		});

		let data = await socket.get("ping", {start: new Date().getTime()}).catch(err=>{throw new Error(err)});
		let pingTime = new Date().getTime() - data.start;

		console.log(pingTime+" ms");
	};
	</script>
</body>
</html>
```



and this on the server :
```js
const WebSocketServer = require('uws').Server;
const SocketWithOn = require('../socketWithOn.js');
const Socket = require('socket.io-with-get');
const wss = new WebSocketServer({ port: 5000 });

wss.on('connection', async function(socket) {
	try{
		socket = new SocketWithOn(socket);
		socket = new Socket(socket);

		socket.on('ping', (data, cb)=>{
			cb(data);
		});

		let data = await socket.get("name", {}).catch(err=>{throw new Error(err)});
		console.log(data);
	}catch(e){
		console.log(e);
	}
});
<<<<<<< HEAD
```
=======
```
>>>>>>> fecd888b940dd16737777a1ee92c04fbb85220c1
