require('dotenv').config()

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const LinkStoreController = require('./api/controllers/links.store.controller')
const LinkShowController = require('./api/controllers/links.show.controller')
const LinkStatsController = require('./api/controllers/links.stats.show.controller')

app = express()
app.use(bodyParser.json())

app.post('/api/links', LinkStoreController)
app.get('/api/links/:code/stats',LinkStatsController)

app.get('/:code', async (req, res, next) => {
    res.set('Cache-Control', 'no-store')

    if (req.url.startsWith('/favicon')){
        return res.status(404).json()
    }

    LinkShowController(req,res,next)

}, (req, res) => {
    let clientDir = __dirname + '/client'
    return res.status(404).sendFile(path.join(clientDir,'index.html'))
})

app.get('*', (req, res) => {

    let clientDir = __dirname + '/client'

    if (req.url.startsWith('/js')){
        return res.sendFile(path.join(clientDir,'dist',req.url))
    }

    if (req.url.startsWith('/css')){
        return res.sendFile(path.join(clientDir,'dist',req.url))
    }

    return res.sendFile(path.join(clientDir,'index.html'))
})


app.listen(process.env.PORT || 3000)