const settings = require("../config.json");

module.exports = async(client, msg, suffix, serverDocument) => {
	if (serverDocument.config.admins.id(msg.author.id).level >= 2) {
		let member, reason;
		if (suffix.indexOf("|") > -1 && suffix.length > 3) {
			member = await client.memberSearch(suffix.substring(0, suffix.indexOf("|")).trim(), msg.guild).catch(() => {
				member = null;
			});
			reason = suffix.substring(suffix.indexOf("|") + 1).trim();
		} else {
			member = await client.memberSearch(suffix, msg.guild).catch(() => {
				member = null;
			});
		}
		if (member) {
			msg.guild.kick(member.id, 7).then(() => {
				msg.channel.send({
					embed: {
						color: 0x00FF00,
						author: {
							name: "SunBot",
						},
						description: `${member.tag} has been kicked.`,
						footer: {
							text: `You now have ${msg.guild.memberCount} members.`,
						},
					},
				}).catch(err => {
					msg.channel.send({
						embed: {
							color: 0xFF0000,
							title: "❌ Error",
							description: err.message,
							footer: {
								text: settings.version,
							},
						},
					});
				});
			});
		}
	}
};
