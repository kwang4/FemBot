module.exports =
{
    name:'cool',
    args:0,
    usage:' ',
    description: 'am I cool or not',
    category:'fun',
    perms:'',
    run(message,args)
    {
        let rn = Math.random();
        if(rn>=.5)
            message.channel.send('Yes you are very cool UwU');
        else
            message.channel.send('Not as cool as the Femboys :sunglasses:');
    }
};