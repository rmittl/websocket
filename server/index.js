const Websocket = require('ws')
const wsServer = new Websocket.Server({ port: 3333 })
let i = 0

wsServer.on('connection', ws => {
  i++
  console.log(`Connection ${i} to client`)
  ws.on('message', m => {
    wsServer.clients.forEach(client => {
      if (client !== ws) {
        client.send(m)
      }
    })

    console.log('received:' + m)
    ws.send(m)
  })

  ws.on('close', _ => {
    console.log('Connection Client closed')
  })
})
