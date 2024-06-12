const URL = require('../models/url')
const shortid = require('shortid');

async function handleGenerateShortId(message){
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectUrl: message
    })
    return shortID;
}

async function redirectGeneratedShortId(shortID){
    const entry = await URL.findOne({shortId: shortID})
    console.log(entry.redirectUrl);
    return entry.redirectUrl;
}
module.exports ={
    handleGenerateShortId,
    redirectGeneratedShortId
}