require('dotenv').config()
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name: 'ping',
        description: 'This is a test command',
    },
    {
        name: 'create-private-channel',
        description: 'Create a private channel.',
        options: [
            {
                name:'channel-name',
                description: 'The name of the temporaty channel.',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);



/************************************
 * Command to register the commands *
 ************************************/

(async () => {
    try {
        console.log(`Registering / commands`)
        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID,
                
                ),
                {body: commands}
        );
        
        console.log(`/ commands where registerd`)
    }catch(error){
        console.log(`There was an error: ${error}`);
    }
})();