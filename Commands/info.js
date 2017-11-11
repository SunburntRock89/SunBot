const settings = require('../config.json');

module.exports = async (client, msg, suffix) => {
    const Discord = require('discord.js');
    const embed = new Discord.RichEmbed();
    embed.setTitle("SunBot")
    .setDescription("SunBot by SunburntRock89 and Dan. :dizzy:")
    .setColor("#5491F2")
    .setFooter("v0.01 ALPHA")
    msg.channel.send({ embed })
};