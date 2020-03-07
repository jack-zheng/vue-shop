const express = require('express')
const compression = require('compression')
// [config for https]
// const https = require('https')
// const fs = require('fs')
const app = express()

// [config for https]
// const options = {
//     cert: fs.readFileSync('./full_chain.pem'),
//     key: fs.readFileSync('./private.key')
// }

// 这一行必须在加载静态文件之前
app.use(compression())
app.use(express.static('./dist'))

app.listen(80, ()=> {
    console.log('server running at http://127.0.0.1')
})

// [config for https]
// https.createServer(options, app).listen(443)