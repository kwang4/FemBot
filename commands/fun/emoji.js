var emojicache;
exports.run = async (client,message,args) =>
{
    const channel = message.channel;
    const author = message.author;
    const emojiArr = ['poggers','partypug','blob','among_us','blob2','thicc_us','blobchain'];
    const emojiIdArr = ['768574644390985738','768568749573275718','769701151641174077','769696260046979082','769696322558099466','769696194544402453','769701391420882945'];
    for(var i =0;i<emojiArr.length;i++)
    {
        if(emojiArr[i].toLowerCase()==args[0].trim())
        {
            channel.send('**'+message.author.username+'**\n\n').then(channel.send('<a:'+emojiArr[i]+':'+emojiIdArr[i]+'>'));
            message.delete();
            return;
        }
        
    }
    
    message.delete();

if(!emojiArr.includes(args[0].trim().toLowerCase()))
{
    var allEmojis = '';
    for(var i =0;i<emojiArr.length;i++)
    {
        allEmojis+=emojiArr[i] + ': <a:'+emojiArr[i]+':'+emojiIdArr[i]+'>,    ';
    }
    message.reply('No matching emoji found. Here is a list of current emojis the bot has access to : '+allEmojis);
    var cache = await client.emojis.cache;
    console.log(cache);
}

    

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

