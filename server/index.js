const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'

mongo.connect(url, (err, db) => {
  console.log('Mongo DB connected')
  if (err) throw err
  const dbo = db.db('myChatapp')
  const myobj = { name: 'Company Inc', address: 'Highway 37' }
  dbo.collection('test').insertOne(myobj, (err, res) => {
    if (err) throw err
    console.log('1 document inserted')
    db.close()
  })
})

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

// Client side
// 1 Client sends over message
// 2. onMessage (e.data [{}, {}, {}, {}])
// 3. NEeds to know how to populate the messages into the chatroom

// Server
// 1. Server receives message
// 2. It save in some database
// 3. Get the latest X messages from database
// 4. Send all messages back to client { name: XXX, message: YYY }
