import express from 'express'
import bodyParser from 'body-parser'
import {
  parseContent,
  sortByBirthdate,
  sortByGender,
  sortByLastName,
} from './parse'

let app = express()
// Mock DB
let records = []

// Middleware
app.use(bodyParser.text())

// Endpoints
app.post('/records', (req, res) => {
  let parsed = parseContent(req.body)
  records = records.concat(parsed)
  res.send(records)
})
app.get('/records/gender', (req, res) => res.send(sortByGender(records)))
app.get('/records/birthdate', (req, res) => res.send(sortByBirthdate(records)))
app.get('/records/name', (req, res) => res.send(sortByLastName(records)))

export default app
