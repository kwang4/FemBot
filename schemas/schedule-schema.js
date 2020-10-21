const mongoose = require('mongoose');
const reqString = 
{
    type:String,
    required:true
};
const scheduleSchema = mongoose.Schema(
    {
        _id:reqString,
        messageIds:[reqString],
    });
module.exports = mongoose.model('schedule',scheduleSchema);