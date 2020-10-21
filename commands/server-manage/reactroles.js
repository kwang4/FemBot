module.exports = 
{
    name:'reactroles',
    args: 1,
    usage:'[role to give] [emoji]',
    description: 'Creates a message to give roles via reactions',
    category:'ADMINISTRATOR',
    perms:true,
    run:async(message,args)=>
    {
       try
       {
        const theRole = message.mentions.roles.first();
        const theChannel = message.mentions.channel.first();
        if(!theChannel) theChannel = message.channel;
         

       }
       catch(err)
       {
            console.error(err);
            message.channel.send('Error creating reaction message');
       }
    }



}