require('dotenv').config()
const {Client, GatewayIntentBits} = require('discord.js')
const {connectToMongoDB} = require('./connection')
const {handleGenerateShortId,   redirectGeneratedShortId} = require('./controller/url.controller');
const {RespondPrompt} = require('./controller/ai.controller');


connectToMongoDB(process.env.MONGODB_URL).then(()=>{
    console.log("Mongodb Connected")
});

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('messageCreate',async message =>{
    // console.log(message.content);
    if(message.author.bot) return;
    if(message.content.startsWith('create')){
        const url = message.content.split('create')[1]
        console.log(url);
        const shortID = await handleGenerateShortId(url);
        return message.reply({
            content:"Generated short id for " + url + " is " + shortID
        })
    }
    if (message.content.startsWith('find')) {
        const shortId = message.content.split('find')[1].trim();
        console.log(shortId);
        try {
            const redirectUrl = await redirectGeneratedShortId(shortId);
            console.log(redirectUrl)
            return message.reply({
                content: "Url for given shortId is: " + redirectUrl
            });
        } catch (error) {
            console.error("Error finding URL: ", error);
            return message.reply({
                content: "There was an error finding the URL for the given short ID. Please ensure the short ID is correct."
            });
        }
    }

    if(message.content.startsWith('prompt')){
        lowercaseMessage = message.content.toLocaleLowerCase();
        console.log(lowercaseMessage);
        const prompt = lowercaseMessage.split('prompt')[1]
        const customizePrompt = "Generate a content of maximum 3500 letters and in easy language" + prompt;
        try{
            const promptResponse = await RespondPrompt(customizePrompt)
            return message.reply({
                content: promptResponse,
            })
        }
        catch(error){

        }
    }

    
    message.reply(
        {
            content: "Hii From Bot",
        }
    );

});

client.on('interactionCreate',(interaction)=>{
    interaction.reply('Pong!!')

    // if(interaction='prompt'){
    //     prompt = interaction.content;
    //     console.log(prompt);
    //     try{
    //         const promptResponse = RespondPrompt(prompt)
    //         return interaction.reply({
    //             content: promptResponse,
    //         })
    //     }
    //     catch(error){

    //     }
    // }

})

client.login(process.env.Token)