const Discord = require('discord.js');
const settings = require('./config.json');
const client = new Discord.Client();

client.on('message', message => {
	if (message.content.startsWith(settings.prefix + "ping")) {
		const embed = new Discord.RichEmbed();
		embed.setTitle("PoniJS")
		.setDescription("Pong! :ping_pong:")
		.setColor("#5491F2")
		.setFooter("v0.01 ALPHA")
		message.channel.sendEmbed(embed);
	}
})

client.login(settings.token);