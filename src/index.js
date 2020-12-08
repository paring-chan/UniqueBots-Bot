const Discord = require('discord.js')
const config = require('../config.json')
const express = require('express')

process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)


const app = express()

app.use(express.json())

app.post('/evaluate', (req, res) => {
    if (!req.body || !req.body.code) return res.end()
    new Promise(resolve => resolve(eval(req.body.code))).then(result => {
        res.json({result})
    }).catch(err => {
        res.json({err})
    })
})

const client = new Discord.Client({
    presence: {
        status: 'invisible'
    }
})

client.on('ready', () => {
    console.log('ready')
})


client.login(config.token).then(() => app.listen(config.internal.port, '127.0.0.1'))
