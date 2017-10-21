const Discord = require('discord.js');

module.exports = async (client, msg, suffix) => {
	const embed = new Discord.RichEmbed();
	let text = msg.content.split(/\s+/g).slice(1).join(" ");
	embed.setTitle(msg.author.tag)
	.setThumbnail(msg.author.avatarURL)
	.setColor("#5491F2")
	.setDescription("\n" + text)
	.setFooter("v0.01 ALPHA")
	msg.channel.send({embed});
}
