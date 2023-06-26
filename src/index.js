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

/**********
 * Events *
 **********/

client.on('interactionCreate', (interaction) => {

  if(inMemberAddToPrivateChannel){

    if(interaction.commandName === "exit"){

      inMemberAddToPrivateChannel = false;
      interaction.reply(`exited`);

    }

    interaction.reply(`active member add`);

  } 
  else if ( !interaction.isChatInputCommand()){
    console.log("TEST")

    return;
  } //Checks if interatiction is / command
  else {
    switch(interaction.commandName){
      case "ping":{
        interaction.reply('pong');
      }
      case "create-private-channel": {
        
        let channel_name = interaction.options.get('channel-name')?.value;
  
        let memberArray = []
  
        interaction.reply(`What channel members do you want for "${channel_name}"`);
  
        inMemberAddToPrivateChannel = true;
      }
    }
  }


})