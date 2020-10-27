const fs = require('fs');

exports.loadAndRunEvents = (client)=>
{
    fs.readdir('./events',(err,files)=>
    {
        if(err) return console.error(err);
        files.forEach(file=>
            {
                if(!file.endsWith('.js')) return;
                const event = require('../events/'+file);
                if(event.conf.event)
                client.on(event.conf.event,event.on.bind(null,client));
                console.log('event handled');
            });
    });
};