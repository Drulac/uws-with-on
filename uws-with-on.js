class SocketWithOn{
	constructor (ws) {
		let onsMethod = [];

		this.emit = (event, data)=>{
			ws.send(JSON.stringify([event, data]));
		}

		this.on = (event, cb)=>{
			onsMethod[event] = cb;
		}

		let methods = {send: (event, data)=>{}, on: (event, data)=>{}}

		const areInNode = (typeof window === 'undefined');

		const callEventMethod = (ms)=>{
			let msg = areInNode ? ms : ms.data;
			let [event, data] = JSON.parse(msg);

			if(event in onsMethod)
			{
				onsMethod[event](data);
			}
		};

		if(areInNode)
		{
			ws.on('message', callEventMethod);
		}else{
			ws.onmessage = callEventMethod;
		}
	}
}

try{
	module.exports = SocketWithOn;
}catch(e){}