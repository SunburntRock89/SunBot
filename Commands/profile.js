const Discord = require('discord.js');

module.exports = async (client, msg, suffix) => {
	const embed = new Discord.RichEmbed();
	if(msg.mentions.users.size == 0) {
		return msg.channel.send(`**${msg.author} You need to mention someone! :face_palm:**`).catch(console.error);
	}
	embed.setTitle("PoniJS")
	.addField("Username", msg.mentions.members.first().user.username, true)
	.addField("ID", msg.mentions.members.first().user.id, true)
	.addField("Date of Creation", msg.mentions.members.first().user.createdAt)
	.setThumbnail(msg.mentions.members.first().user.avatarURL)
	.setColor("#5491F2")
	.setFooter("v0.01 ALPHA")
	msg.channel.send({embed});
}
