const addReaction = require('./messageReactionAdd.js');
exports.on = async (client,messageReaction,user) =>
{
if(messageReaction.emoji.name != '💀')
{
addReaction.on(client,messageReaction,user);
}

};
exports.conf = 
{
        event:'messageReactionRemove'
};