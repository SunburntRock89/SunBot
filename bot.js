const Discord = require('discord.js');
const settings = require('./config.json');
const client = new Discord.Client();

client.login(settings.token);