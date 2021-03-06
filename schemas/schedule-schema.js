const mongoose = require('mongoose');
const reqString = 
{
    type:String,
    required:true
};
const scheduleSchema = mongoose.Schema(
    {
        _id:reqString,
        serverName:
        {
            type:String,
            required:false,
            default:''
        },
        messageIds:
        {
            type:Array,
            required:false,
            default:[]
        },
    });
module.exports = mongoose.model('schedule-command',scheduleSchema);