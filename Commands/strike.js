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
		let targetMemberDocument = serverDocument.members.id(member.id);
		if (!targetMemberDocument) {
			serverDocument.members.push({ _id: member.id });
			targetMemberDocument = serverDocument.members.id(member.id);
		}
		targetMemberDocument.strikes.push({
			_id: msg.author.id,
			reason: reason || "No reason",
		});
		await serverDocument.save().then(() => {
			msg.channel.send({
				embed: {
					color: 0x00FF00,
					author: {
						name: "SunBot",
					},
					description: `${member.user.username} has been striked for: ${reason}`,
					footer: {
						text: `They now have ${targetMemberDocument.strikes.length} strike(s).`,
					},
				},
			});
		}).catch(err => {
			msg.channel.send({
				embed: {
					color: 0xFF0000,
					title: "❌ Error",
					description: `Could not add strike to member: ${err}`,
					footer: {
						text: `If you do not understand this error please DM SunburntRock89#6617`,
					},
				},
			});
		});
	} else {
		msg.channel.send({
			embed: {
				color: 0xFF0000,
				title: "❌ Error",
				description: `Could not detect a member.`,
				footer: {
					text: `Mention a member you nonce.`,
				},
			},
		});
	}
};
