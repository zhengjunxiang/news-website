const fs = require('fs')
const { resolve } = require('path')

const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

const isConsole = process.env.ENV_TYPE === 'console'

const renderer = createBundleRenderer(resolve(__dirname, `../src/${isConsole ? 'console' : 'client'}/skeleton/skeleton.json`), {
  template: fs.readFileSync(resolve(__dirname, `../src/${isConsole ? 'console' : 'client'}/index.html`), 'utf-8')
})

renderer.renderToString({}, (err, html) => {
  fs.writeFileSync(resolve(__dirname, `../src/${isConsole ? 'console' : 'client'}/index-sk.html`), html, 'utf-8')
})
