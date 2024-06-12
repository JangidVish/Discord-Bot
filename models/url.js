const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    shortId: {
        type:String,
        required: true,
        unique: true
    },
    redirectUrl:{
        type:String,
        required: true
    }
})

const url = mongoose.model('discordUrl', urlSchema);

module.exports = url;