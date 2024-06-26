require('dotenv').config()

const {REST, Routes} = require('discord.js')


const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
      },
      {
        name: 'create',
        description:"Creating a Short-Url"
      },
      {
        name: 'find',
        description:"Finding url for shortId"
      },
      {
        name: 'prompt',
        description: 'Search For Question or topic'
      }

]
const rest = new REST({ version: '10' }).setToken(process.env.Token);
(async ()=>{
try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();