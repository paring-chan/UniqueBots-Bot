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
        console.log(result)
        res.json({result})
    }).catch(err => {
        console.log(err)
        res.json({err})
    })
})

const client = new Discord.Client({
    presence: {
        status: 'online'
    }
})

client.on('guildMemberAdd', async member => {
    if (member.guild.id !== config.guild) return
    if (member.user.bot) {
        await member.roles.add(config.role.pending)
    }
})

client.on('ready', () => {
    console.log('ready')
})


client.login(config.token).then(() => app.listen(config.internal.port, '127.0.0.1'))
