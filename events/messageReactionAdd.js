const scheduleSchema = require('../schemas/schedule-schema.js');
const iconUrl = 'https://cdn.discordapp.com/avatars/766406073715523594/c43734e1a775fd35b9b5ecc45110914c.png?size=256';

exports.on = async (client,messageReaction,user) =>
{
   if(messageReaction.partial)
   {
    messageReaction = await messageReaction.fetch();
   }
   //got the whole message now

   var msgIds = await getDBSchedule(messageReaction.message);
   if(!msgIds||msgIds == 'null') return;
   if(messageReaction.message.author.id == client.user.id && user.id != client.user.id && msgIds.includes(messageReaction.message.id))//Is this a schedule message?
   {
   scheduleCommandCheck(client,messageReaction,user);
   }

};

async function scheduleCommandCheck(client,messageReaction,user)
{

        //var maData = ['12345','23445','12345'];
        var yes =['-'];var no =['-']; var maybe = ['-'];
        var allReactions = await messageReaction.message.reactions.cache;
        //modDB(messageReaction,maData);
 
        for(var msgR of allReactions.values())
        {
         switch(msgR.emoji.name)
         {
             case '✅':
             yes = await(await(msgR.users.fetch())).map(member=>member.username);
                 break;
             case '❔':
             maybe = await(await(msgR.users.fetch())).map(member=>member.username);
                 break;
             case '❌':
             no = await(await(msgR.users.fetch())).map(member=>member.username);
                   break;
         }
        }
        yes = yes.filter(r=>r!==client.user.username);
        no = no.filter(r=>r!==client.user.username);
        maybe= maybe.filter(r=>r!==client.user.username);
        var oldEmbed = messageReaction.message.embeds[0];
        var embedObj = 
 {
     embed:
     {
         color:16748799,
             title:oldEmbed.title,
             description:'',
         fields:
             [
                 {
                     name: '✅     Accepted',
                     value: yes.join(' \n')+'\n-',
                     inline: true,
                 },
                 {
                     name: '❌    Rejected',
                     value: no.join(' \n')+'\n-',
                     inline: true,
                 },
                 {
                     name: '❔     Unsure',
                     value: maybe.join(' \n')+'\n-',
                     inline: true,
                 },
                    
                 {
                     name: '\u200b',
                     value: '\u200b',
                     inline: false,
                 },
             ],
             footer: {
                 text: oldEmbed.footer.text,
                 icon_url: oldEmbed.footer.icon_url,
             }
     }
 }
 messageReaction.message.edit(embedObj);
 
};

 function getDBSchedule(message)
{
    return new Promise(async(resolve, reject) =>{
        var msgIds;
            try
            {
                const guildId = message.guild.id;
                const result = await scheduleSchema.findOne({_id:guildId});
                if(!result) {resolve('null');return;}
                msgIds = result.messageIds;
            }
            catch(err) {console.log(err)}
            finally
            {
                resolve(msgIds);
            }

    });
    
}

exports.conf = 
{
    event:'messageReactionAdd'
};