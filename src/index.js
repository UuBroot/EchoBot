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

/**********
 * Events *
 **********/

client.on('interactionCreate', (interaction) => {
  if(!interaction.isChatInputCommand())return; //Checks if interatiction is / command

  switch(interaction.commandName){
    case "ping":{
      interaction.reply('pong');
    }
  }
})