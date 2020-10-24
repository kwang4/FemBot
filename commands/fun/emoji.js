exports.run = (client,message,args) =>
{
    const channel = message.channel;
    const author = message.author;
    const emojiArr = ['poggers','partypug','blob','among_us'];
    const emojiIdArr = ['768574644390985738','768568749573275718','768569947969421333','768569722173128744'];
    for(var i =0;i<emojiArr.length;i++)
    {
        if(emojiArr[i].toLowerCase()==args[0].trim())
        {
            channel.send('<a:'+emojiArr[i]+':'+emojiIdArr[i]+'>');
            return;
        }
        
    }
    
    message.delete();
    message.reply('No matching emoji found. Here is a list of current emojis the bot has access to : '+emojiArr);
};
exports.conf = 
{
    name:'emoji',
    args:1,
    usage:'[emoji name you want]',
    description: 'sends nitro emojis',
    category:'fun',
    perms:'',
};

