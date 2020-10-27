exports.run = (client,message,args) =>
{
    var commandList = Array.from(client.commands.keys()).filter(r=>r!='devInput');
    message.channel.send('Help command is still being made, so here is a list of commands that you can type to get the usage: \n'+ '\`'+commandList+'\`');
};
exports.conf = 
{
    name:'help',
    args:0,
    usage:' ',
    description: 'gives you help lmao',
    category:'standard',
    perms:'',
    aliases:['h'],
};

