/* eslint-disable */
const path = require('path')
const history = require('connect-history-api-fallback')
const proxy = require('http-proxy-middleware')
const express = require('express')
const app = express()
const { host, port } = require('./config')
const opn = require('opn')
const router = express.Router()

const indexRoute = router.get('/', (req, res) => {
  res.status(200).render('index')
})

app.set('views', path.join(__dirname, '../dist'))
app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)

app.use("*.json$", proxy({
  target: `http://${host}:${port.api}`,
  secure: false,
  changeOrigin: true
}));

app.use('/', express.static(path.join(__dirname, '../dist')))

app.use(history({
  rewrites: [
    { from: /.*/, to: '/' }
  ]
}))

app.get('/', indexRoute)

app.use((req, res) => {
  res.status(404).send('File not found!')
})

app.listen(port.dist, host, () => {
  console.log('The server is running at ' + host + ":" + port.dist)
})
opn(`http://${host}:${port.dist}`)
