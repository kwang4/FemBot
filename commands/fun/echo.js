exports.run = (client,message,args) =>
{
    var response = '';
    args.forEach(element=>
        {
        response +=(element.toString()+ ' ');
    });
    message.channel.send('Fembot says ' + response);
};
exports.conf = 
{
    name:'echo',
    args:1,
    usage:'[word you want to say]',
    description: 'repeat something',
    category:'fun',
    perms:'',
};

