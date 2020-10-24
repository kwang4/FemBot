const mongo = require('../../mongo.js');
const welcomeSchema = require('../../schemas/welcome-schema.js');

exports.run =  async (client,message,args) =>
{
    var response = '';
    args.forEach(element=>
        {
        response +=(element.toString()+ ' ');
    });
    await mongo().then(async (mongoose) =>
        {
            try
            {
                await welcomeSchema.findOneAndUpdate(
                    {
                        _id:message.guild.id
                    }, 
                    {
                        _id: message.guild.id,
                        channelId:message.channel.id,
                        welcomeText:response
                    },
                    {upsert:true,useFindAndModify:false}
                );
                message.channel.send('New Welcome Message: '+response);
                message.delete();
            }catch{console.error('db most likely down');}
            finally
            {
                mongoose.connection.close();
            }
        });
};
exports.conf = 
{
    name:'setwelcome',
    args:1,
    usage:'[welcome message]',
    description: 'sets welcome message for each server, use this in whichever channel you want the welcome message to show',
    category:'standard',
    perms:'ADMINISTRATOR',
};

