const Discord = require("discord.js");
const settings = require("../config.json");

module.exports = async(client, msg, suffix) => {
	const embed = new Discord.MessageEmbed();
	let text = msg.content.split(/\s+/g).slice(1).join(" ");
	embed.setTitle(msg.author.tag)
		.setThumbnail(msg.author.avatarURL)
		.setColor("#5491F2")
		.setDescription(`\n${text}`)
		.setFooter(settings.version);
	msg.channel.send(embed);
};
