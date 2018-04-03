
const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'

const insertMessage = message => {
  mongo.connect(url, (err, db) => {
    console.log('Mongo DB connected')
    if (err) throw err
    const dbo = db.db('myChatapp')

    dbo.collection('messages').insertOne(message, (err, res) => {
      if (err) throw err
      console.log('1 message inserted')
      db.close()
    })
  })
}

const getMessages = _ => {
  mongo.connect(url, function (err, db) {
    if (err) throw err
    var dbo = db.db('myChatapp')
    dbo.collection('messages').find({}).toArray(function (err, result) {
      if (err) throw err
      console.log(result)
      return result
      db.close()
    })
  })
}

const Websocket = require('ws')
const wsServer = new Websocket.Server({ port: 3333 })
let i = 0

wsServer.on('connection', ws => {
  i++
  console.log(`Connection ${i} to client`)
  ws.on('message', m => {
    wsServer.clients.forEach(client => {
      if (client !== ws) {
        // GET data from the client
        client.send(m + )
      }
    })

    insertMessage({ m })
    getMessages()
    console.log('Get from MongoDB ' + getMessages())
    // console.log('received:' + m)
    ws.send(m + getMessages())
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
