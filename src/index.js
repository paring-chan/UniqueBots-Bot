const Discord = require('discord.js')
const config = require('../config.json')

process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)

const client = new Discord.Client({
    presence: {
        status: 'invisible'
    }
})


client.login()
