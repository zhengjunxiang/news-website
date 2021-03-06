/* eslint-disable */
const path = require('path')
const history = require('connect-history-api-fallback')
const express = require('express')
const app = express()
const { hostPub, port, hostLis } = require('../../config/ip-port')
const router = express.Router()

const indexRoute = router.get('/', (req, res) => {
  res.status(200).render('index')
})

const serPort = port.pub.cli

app.set('views', path.join(__dirname, '../../dist/client'))
app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)

app.use('/', express.static(path.join(__dirname, '../../dist/client')))

app.use(history({
  rewrites: [
    { from: /.*/, to: '/' }
  ]
}))

app.get('/', indexRoute)

app.use((req, res) => {
  res.status(404).send('File not found!')
})

app.listen(serPort, hostPub, () => {
  console.log('The server is running at ' + hostPub + ":" + serPort)
})
