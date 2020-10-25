const fs = require('fs');
const cfg = require('../config.json');
exports.loadJsCommands = (client) =>
{
    fs.readdir('./commands/',(direrr,dirs)=>
    {
        if(direrr||dirs.length ==0) return console.log("Unable to parse directory");
        dirs.forEach(dir=>
        {
            var path = './commands/'+dir+'/';
            fs.readdir(path,(err,files)=>
            {
                if(err) return console.error(err);
                files.forEach(file=>
                    {
                        if(!file.endsWith('.js')) return;
                        path = '../commands/'+dir+'/'  //Fs is dumb and runs from index.js directory, but require runs from wherever this file is (utils), so have to edit path here only.
                       try
                       {
                           delete require.cache[require.resolve(path+file)];
                       }catch{console.log(file + 'has not been loaded before')}
                        let command_file = require(path+file);
                        client.commands.set(command_file.conf.name,command_file);
                        console.log(`:${command_file.conf.name}:`);
                        
                    });
            });
            
        });
    });
};
exports.handleCommands = (client) =>{
client.on("message", (message) => { 
    //console.log(message.content);
    //parse message for commands and args
	if(message.author.bot || !message.content.startsWith(cfg.prefix)||message.guild === null) return;
	const args = message.content.slice(cfg.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    //checking right number of args
    

    const command = client.commands.get(commandName)||client.commands.find(cmd=>cmd.conf.aliases && cmd.conf.aliases.includes(commandName));
    if(!command) return;
    if(command.conf.perms)
    {
        if(!message.member.hasPermission(command.conf.perms))
        {
            message.reply('You do not have the required perms ');
            return;
        }
        
    } 
    if(args.length<command.conf.args) //if provided args num is less than required args in command
    {
        let response = `Wrong number of arguments provided, ${message.author}`;
        if(command.conf.usage)
        {
            response += `\nProper usage is: ${cfg.prefix} ${commandName} ${command.conf.usage}`;
        }
        message.channel.send(response);
        return;
    }
    try
    {
        command.run(client,message,args);
    }
    catch(error)
    {
        console.error(error);
        message.reply('there was an error trying to execute the command');
    }
});
}