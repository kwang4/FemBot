const fs = require('fs');
const Discord = require('discord.js');
const cfg = require('./config.json');
require ('dotenv').config()
const token = process.env.TOKEN
const devInput = require('./commands/dev/devInput');
const commandHandler = require('./utils/commandHandler.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();


function loadEvents()
{
    fs.readdir('./events',(err,files)=>
    {
        if(err) return console.error(err);
        files.forEach(file=>
            {
                if(!file.endsWith('.js')) return;
                const event = require('./events/'+file);
                if(event.conf.event)
                client.on(event.conf.event,event.on.bind(null,client));

            });
    });
}
client.on('ready',()=>
{
    console.log('logged in as '+ client.user.tag);
});

client.login(token);
commandHandler.loadJsCommands(client);
commandHandler.handleCommands(client);
loadEvents();
devInput.run(client);


