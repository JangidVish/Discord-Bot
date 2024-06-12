require('dotenv').config()
const {GoogleGenerativeAI} = require('@google/generative-ai')

//Accesss API KEY
const genAi = new GoogleGenerativeAI(process.env.API_KEY)

async function RespondPrompt(prompt){
    const model = genAi.getGenerativeModel({
        model: 'gemini-1.5-flash'
    })

    const promptResponse = prompt;

    const result = await model.generateContent(promptResponse);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
}

module.exports = {
    RespondPrompt
}