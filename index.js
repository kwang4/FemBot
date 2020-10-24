const fs = require('fs');
const Discord = require('discord.js');
const cfg = require('./config.json');
require ('dotenv').config()
const token = process.env.TOKEN
const devInput = require('./commands/dev/devInput');
const commandHandler = require('./utils/commandHandler.js');
const eventHandler = require('./utils/eventHandler.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Discord.Collection();


client.on('ready',()=>
{
    console.log('logged in as '+ client.user.tag);
});

client.login(token);
commandHandler.loadJsCommands(client);
commandHandler.handleCommands(client);
eventHandler.loadAndRunEvents(client);
devInput.run(client);


