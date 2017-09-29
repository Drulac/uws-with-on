const EventEmitter = require('events');

class SocketWithOn extends EventEmitter{
	constructor (ws) {
		super();

		const areInNode = (typeof window === 'undefined');

		const write = ws.write !== undefined;

		this.write = (event, data)=>{
			if(write){
				ws.write(JSON.stringify([event, data]));
			}else{
				ws.send(JSON.stringify([event, data]));
			}
		}

		const callEventMethod = (ms)=>{
			let msg = areInNode ? ms : ms.data;
			let [event, data] = JSON.parse(msg);

			this.emit(event, data);
		};

		if(areInNode)
		{
			ws.on('message', callEventMethod);
			ws.on('data', callEventMethod);
		}else{
			ws.onmessage = callEventMethod;
		}
	}
}

try{
	module.exports = SocketWithOn;
}catch(e){}