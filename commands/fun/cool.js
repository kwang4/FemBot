exports.run = (client,message,args) =>
{
    let rn = Math.random();
    if(rn>=.5)
        message.channel.send('Yes you are very cool UwU');
    else
        message.channel.send('You\'\re not as cool as the Femboys :sunglasses:');
};
exports.conf = 
{
    name:'cool',
    args:0,
    usage:' ',
    description: 'am I cool or not',
    category:'fun',
    perms:'',
    aliases:[],
};

