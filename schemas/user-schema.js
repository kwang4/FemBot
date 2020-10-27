const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        _id:
        {
            type:String,
            required:true
        },
        perms:
        {
            type:Number,
            required:false
        },
    });
module.exports = mongoose.model('Users',userSchema);