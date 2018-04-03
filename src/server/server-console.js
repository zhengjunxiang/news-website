/* eslint-disable */
const path = require('path')
const history = require('connect-history-api-fallback')
const proxy = require('http-proxy-middleware')
const express = require('express')
const app = express()
const { host, port } = require('../../config/ip-port')
const opn = require('opn')
const router = express.Router()

const indexRoute = router.get('/', (req, res) => {
  res.status(200).render('index')
})

const serPort = port.dist.con

app.set('views', path.join(__dirname, '../../dist/console'))
app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)

app.use("*.json$", proxy({
  target: `http://${host}:${port.api}`,
  secure: false,
  changeOrigin: true
}));

app.use("/resouce", proxy({
  target: `http://${host}:${port.api}`,
  secure: false,
  changeOrigin: true
}));

app.use('/', express.static(path.join(__dirname, '../../dist/console')))

app.use(history({
  rewrites: [
    { from: /.*/, to: '/' }
  ]
}))

app.get('/', indexRoute)

app.use((req, res) => {
  res.status(404).send('File not found!')
})

app.listen(serPort, host, () => {
  console.log('The server is running at ' + host + ":" + serPort)
})
opn(`http://${host}:${serPort}`)
