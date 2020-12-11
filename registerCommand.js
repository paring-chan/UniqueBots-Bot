const fetch = require('node-fetch')
const config = require('./config.json');

(async () => {
    const json = require('./commands/' + process.argv.pop() + '.json')

    const type = process.argv.pop()

    if (type === 'add') {
        console.log(await fetch(`https://discord.com/api/v8/applications/${config.application}/guilds/${config.guild}/commands`, {
            headers: {
                Authorization: 'Bot ' + config.token,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(json)
        }).then(res => res.json()))
    } else if (type === 'remove') {
        console.log(await fetch(`https://discord.com/api/v8/applications/${config.application}/guilds/${config.guild}/commands`, {
            headers: {
                Authorization: 'Bot ' + config.token,
            },
            method: 'GET'
        }).then(res => res.json()).then(res => fetch(`https://discord.com/api/v8/applications/${config.application}/guilds/${config.guild}/commands/${res.find(r=>r.name===json.name).id}`, {
            headers: {
                Authorization: 'Bot ' + config.token,
            },
            method: 'DELETE'
        })).then(
            res => res.status
        ))
    } else if (type === 'patch') {
        console.log(await fetch(`https://discord.com/api/v8/applications/${config.application}/guilds/${config.guild}/commands`, {
            headers: {
                Authorization: 'Bot ' + config.token,
            },
            method: 'GET'
        }).then(res => res.json()).then(res => fetch(`https://discord.com/api/v8/applications/${config.application}/guilds/${config.guild}/commands/${res.find(r=>r.name===json.name).id}`, {
            headers: {
                Authorization: 'Bot ' + config.token,
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify(json)
        })).then(res => res.json()))
    }
})()