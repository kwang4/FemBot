const commandHandler = require('../../utils/commandHandler.js');
const eventHandler = require('../../utils/eventHandler.js');
const cache = require('../../cache');



exports.run = (client) =>
{
    var channelID = "762737723499872260";
    let y = process.openStdin();
    y.addListener("data",res=>{
        let x = res.toString().trim();
        if(x.startsWith(".channel "))
        {
            let tempchannel = x.slice(9);
            
            channelID = tempchannel;
            console.log(tempchannel);
        }
        else if(x.startsWith('.cache'))
        {
            console.log(cache);
        }
        else if(x.startsWith('.reload'))
        {
            delete require.cache;
            commandHandler.loadJsCommands(client);
        }
        else if(x.length > 0)
        {
           client.channels.cache.get(channelID).send(x);
            
        }
    });
};
exports.conf = 
{
    name: 'devInput',
    args:0,
    usage:'',
    description: 'Input text from console',
    category:'dev',
    perms:'AINTNOBODYLOVESMEBETTER',
};

