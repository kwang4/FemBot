const fs = require('fs');
const Discord = require('discord.js');
const cfg = require('./config.json');

const mongoose = require('mongoose');
require ('dotenv').config()
const token = process.env.TOKEN
const mongoPath = process.env.DBPATH; //ONLINE DB ACTIVE
const devInput = require('./commands/dev/devInput');
const commandHandler = require('./utils/commandHandler.js');
const eventHandler = require('./utils/eventHandler.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'],ws: { intents: Discord.Intents.ALL }});
client.commands = new Discord.Collection();

mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
client.on('ready',()=>
{
    console.log('logged in as '+ client.user.tag);
    client.user.setActivity('.f help',{type:'WATCHING'});

});

process.on('SIGTERM', () => {
    Promise.all([
        mongoose.connection.close(),
        client.destroy(),
        process.exit()
    ])
})

process.on('SIGINT', async () => {
    Promise.all([
        mongoose.connection.close(),
        client.destroy(),
        process.exit()
    ])
})

client.login(token);
commandHandler.loadJsCommands(client);
commandHandler.handleCommands(client);
eventHandler.loadAndRunEvents(client);
devInput.run(client);


