const express = require('express')
const path = require('path')

const app = express()
const cors=require('cors')

const http = require('http')

app.use(cors())

const server = http.createServer((request, response) => {
	response.writeHead(200, { 'Content-Type': 'text/plain' })
	response.end('Hello World!')
})

app.use('/', express.static(path.join(__dirname,"build")))

app.get('/data', (req, res) => {
	res.sendFile(__dirname + '/assets/data.csv')
})

const port = process.env.PORT || 1337

app.listen(port)

console.log(`Server running at http://localhost:${port}`)
