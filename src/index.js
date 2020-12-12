const Discord = require('discord.js')
const config = require('../config.json')

process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)

const io = require('socket.io')(config.internal.port)

io.use((socket, next) => {
    if (socket.request.connection._peername.address !== '::ffff:127.0.0.1') return socket.disconnect(true)
    next()
})

io.sockets.on('connection', socket => {
    console.log(socket.id)
    socket.on('eval', async data => {
        console.log(data)
        new Promise(resolve => resolve(eval(data.code))).then(result => {
            console.log(result)
            socket.emit('eval', {
                id: data.id,
                result: result
            })
        }).catch(err => {
            console.log(err)
            socket.emit('eval', {
                id: data.id,
                result: err
            })
        })
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


client.login(config.token)
