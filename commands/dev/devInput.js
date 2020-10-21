
const cache = require('../../cache');
module.exports = 
{
    name: 'devInput',
    args:0,
    usage:'',
    description: 'Input text from console',
    category:'dev',
    perms:'',
    run(client)
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
            else if(x.length > 0)
            {
               client.channels.cache.get(channelID).send(x);
                
            }
        });
    }
};

