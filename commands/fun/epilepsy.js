var emojicache;
exports.run =  (client,message,args) =>
{
    const channel = message.channel;
    emojicache = client.emojis.cache;
    searchFor = emojicache.find(r=>r.name.toLowerCase()=='epilepsy');
    if(searchFor)
    {
        
        for(var v=0;v<5;v++)
        {
            let msg = `<a:${searchFor.name}:${searchFor.id}>`;
            for(var i = 0;i<4;i++)
                 {
                  msg+=msg;
                 }
             //channel.send(msg);
             
         }
         message.channel.send({embed:{title:'This is a donator only command. Please consider donating to gain access to this.',description:'Jk lmao, im fixing perms for it',color:16748799}});
        
    }
    else
    {
        message.reply('This bot does not have access to a gif called epilepsy that is needed to run this.')
    }

    message.delete();

};
exports.conf = 
{
    name:'epilepsy',
    args:0,
    usage:'[no args]',
    description: 'sends a very flashy message',
    category:'fun',
    perms:'ADMINISTRATOR',
    aliases:[],
};

