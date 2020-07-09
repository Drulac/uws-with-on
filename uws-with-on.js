const EventEmitter = require('events')
const split = require('split')

class SocketWithOn extends EventEmitter {
	constructor(ws) {
		super()

		const areInNode = typeof window === 'undefined'

		const write = ws.write !== undefined

		this.write = (event, data) => {
			data = JSON.stringify([event, data]) + '\n'
			if (write) {
				ws.write(data)
			} else {
				ws.send(data)
			}
		}

		let totaldata = ''

		const callEventMethod = (ms) => {
			let msg =
				totaldata + (areInNode ? ms : ms.data).toString()

			const parsed = JSON.parse(msg)

			let [event, data] = parsed
			this.emit(event, data)
		}
		const stream = ws.pipe(split())
		stream.on('data', callEventMethod)
	}
}

try {
	module.exports = SocketWithOn
} catch (e) {}
