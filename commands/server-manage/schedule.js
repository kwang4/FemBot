const mongo = require('../../mongo.js');
const scheduleSchema = require('../../schemas/schedule-schema.js');
const iconUrl = 'https://cdn.discordapp.com/avatars/766406073715523594/c43734e1a775fd35b9b5ecc45110914c.png?size=256';
exports.run = async (client,message,args) =>
{
    const channel = message.channel;
    var fullMessage ='';
    var mention = '^^^^^^^';
  for(var i=0;i<= args.length-1;i++)
  {
    if(args[i].startsWith('<@')&&args[i].endsWith('>')||args[i]=='@everyone'||args[i]=='@here')
    {
        if(mention = '^^^^^^^')
        {
            mention = args.splice(i,1);
        }
        args.splice(i,1);

    }
  }
fullMessage = args.join(' ');
    const embedObj = 
    {
        embed:
        {
            color:16748799,
            title:fullMessage,
            description:'',
            fields:
            [
                {
                    name: '✅     Accepted',
                    value: '-',
                    inline: true,
                },
                {
                    name: '❌    Rejected',
                    value: '-',
                    inline: true,
                },
                {
                    name: '❔     Unsure',
                    value: '-',
                    inline: true,
                },
                   
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
            ],
            footer: {
                text: 'Scheduled by ' + message.author.username,
                icon_url: iconUrl,
            }
        }
       


    };
   let msg =  await channel.send(embedObj);
   channel.send(mention.toString()).then();
   msg.react('✅').then(msg.react('❌').then(msg.react('❔').then(msg.react('💀'))));
    pushDB(msg,msg.id);
   
};
exports.conf = 
{
    name:'schedule',
    args:2,
    usage:'[role to ping] [desc and time]',
    description: 'schedules a scrim/match and gives people options to react yes, no, or undecided.',
    category:'server-manage',
    perms:'MANAGE_MESSAGES',
};

async function pushDB(msg,maData)
{
    await mongo().then(async (mongoose) =>
    {
        try
        {
            await scheduleSchema.findOneAndUpdate(
                {
                    _id:msg.guild.id
                }, 
                {
                    _id: msg.guild.id,
                    $push:{messageIds:maData}
                },
                {upsert:true,useFindAndModify:false}
            );
        }catch{console.error('db most likely down');}
        finally
        {
            mongoose.connection.close();
        }
    });
}