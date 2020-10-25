var emojicache;
var formattedEmojis;
var formattedAEmojis;
var animated = '';
exports.run =  (client,message,args) =>
{
    const channel = message.channel;
    const author = message.author;
    emojicache = client.emojis.cache;
    searchFor = emojicache.find(r=>r.name.toLowerCase()==args[0].trim().toLowerCase());
    if(searchFor)
    {
        animated = '';
        if(searchFor.animated)
            animated = 'a'
        message.channel.send(`**${message.author.username}**`);
        message.channel.send('<'+animated+`:${searchFor.name}:${searchFor.id}>`);
        
    }
    else
    {
        formattedAEmojis = '';
        formattedEmojis = '';
            emojicache.forEach(e=>
            {
                if(e.animated)
                {
                    formattedAEmojis += ' <a'+`:${e.name}:${e.id}> `;
                }
                else
                {
                formattedEmojis += ' <'+`:${e.name}:${e.id}> `;
                }
            });
        

        message.channel.send('Emoji not found. Here is a list of all emojis I have access to: \n');
        message.channel.send(formattedAEmojis);
        message.channel.send(formattedEmojis);
        message.reply('Please use .f emoji [name of emoji you want *without* the \":\"]');
    }
    message.delete();

};
exports.conf = 
{
    name:'emoji',
    args:1,
    usage:'[emoji name you want]',
    description: 'sends nitro emojis',
    category:'fun',
    perms:'',
    aliases:['e','emote'],
};

