const mongo = require('../mongo.js');
const welcomeSchema = require('../schemas/welcome-schema.js');
exports.on = async (client,member) =>
{
    const {guild} = member;
    let data;
        await mongo().then(async (mongoose)=>{
            try{
            const result = await welcomeSchema.findOne({_id:guild.id});
            if(!result) return;
            data = [result.channelId,result.welcomeText];
            }
            finally
            {
                mongoose.connection.close();
            }
        });
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