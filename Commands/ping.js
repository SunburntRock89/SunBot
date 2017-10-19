module.exports = async (client, msg, suffix) => {
    const Discord = require('discord.js');
    const embed = new Discord.RichEmbed();
    embed.setTitle("PoniJS")
    .setDescription("Pong! :ping_pong:")
    .setColor("#5491F2")
    .setFooter("v0.01 ALPHA")
    msg.channel.send({ embed })
};