const settings = require("../config.json");

module.exports = async(client, msg, suffix, serverDocument) => {
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
		msg.guild.ban(member.id, 7).then(() => {
			msg.channel.send({
				embed: {
					color: 0x5491F2,
					author: {
						name: "SunBot",
					},
					description: `${msg.mentions.users.first().tag} has been banned.`,
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
};
