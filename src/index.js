const express = require("express");
const app = express();
const { ActivityType } = require('discord.js');

require('dotenv').config()

const Discord = require("discord.js")
const {  
  Client,
  ActionRowBuilder,
  GatewayIntentBits,
  InteractionType,
  ModalBuilder,
  Routes,
  SelectMenuBuilder,
  TextInputBuilder,
  TextInputStyle,
 } = require('discord.js');

/*****************
 * Discord Stuff *
 *****************/
const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
})

client.login(process.env.TOKEN)

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);      //discord online report
  client.user.setPresence({
    activities: [{ name: `/help`, type: ActivityType.Listening }],    //set Status to 'listening to "prefix + help"'
    status: 'Idle',
  });
});

/*************
 * Variables *
 *************/

let inMemberAddToPrivateChannel = false;
let memberArray = [];
let usingMember;

/**********
 * Events *
 **********/

client.on('interactionCreate', (interaction) => {

  if(!interaction.isChatInputCommand()){return;}

  switch(interaction.commandName){
    case "ping":{
      interaction.reply('pong');
    }
    case "create-private-channel": {
      
      let channel_name = interaction.options.get('channel-name')?.value;

      memberArray = []; //resets the member array

      interaction.reply(`What channel members do you want for "${channel_name}. Type "exit" to end this:`);

      inMemberAddToPrivateChannel = true;

      usingMember = interaction.user.id
    }
  }

})

client.on("messageCreate", async (message) => {

  if(inMemberAddToPrivateChannel && !message.author.bot && message.author.id === usingMember){ //Checks if the creation of private channel is on and the member is the writer of the message

    if(message.content === "exit"){
      message.reply("k")
      inMemberAddToPrivateChannel = false;
    }
    else {

      memberArray.push(message.content)

    }
    console.log(memberArray);

  }
  
});