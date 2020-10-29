const welcomeSchema = require('../schemas/welcome-schema.js');
var data;
exports.on = async (client,member) =>
{
    data = null;
    const {guild} = member;
   await getWelcomeMsg(guild);
    if(!data) return;
    const channelId = data[0];
    const text = data[1];
    const channel = guild.channels.cache.get(channelId);
    channel.send({embed: {title:"Welcome, "+member.displayName,color:16748799,description:text}});

};

exports.conf = 
{
    event:'guildMemberAdd'
};

async function getWelcomeMsg (guild){
    try{
    const result = await welcomeSchema.findOne({_id:guild.id});
    if(!result) return;
    data = [result.channelId,result.welcomeText];
    }catch(err){console.log(err);}
};