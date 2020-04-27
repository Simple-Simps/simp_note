const express = require('express')
const Datastore = require('nedb')

const app = express()

app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }))

const database = new Datastore('database.db')
database.loadDatabase()

app.get('/allNotes', (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      res.end()
    }
    res.json(data)
  })
})

app.get('/oneNote', (req, res) => {
  const noteTitle = req.query.note
  database.find({ title: noteTitle }, (err, data) => {
    if(err) {
      res.end()
    }
    res.json(data)
  })
})

app.post('/newNote', (req, res) => {
  const data = req.body
  const timestamp = Date.now()
  data.timestamp = timestamp
  database.insert(data)
  res.json(data)
})

app.listen(3000, () => console.log('go to http://localhost:3000'))