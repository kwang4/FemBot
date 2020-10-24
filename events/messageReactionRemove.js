const addReaction = require('./messageReactionAdd.js');
exports.on = async (client,messageReaction,user) =>
{
addReaction.on(client,messageReaction,user);

};
exports.conf = 
{
        event:'messageReactionRemove'
};