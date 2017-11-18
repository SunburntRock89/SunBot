// Member joined server
module.exports = (client, Servers, winston, svr, member, guild) => {
	// Get server data
	Servers.findOne({ _id: svr.id }, (err, serverDocument) => {
		if (!err && serverDocument) {
			winston.info(`Member '${guild.member.user.username}' has joined server '${svr.name}'`, { svrid: svr.id, usrid: guild.member.id });
			// Check if status message for new member is enabled
			if (serverDocument.Config.status_messages.new_member_message.isEnabled === true) {
				let member_message = serverDocument.Config.status_messages.new_member_message;
				client.channels.get(guild.defaultChannel).send({
					embed: {
						color: 0xFFFFFF,
						// description: `${member_message.messages[0]}`,
						description: `fuck`,
					},
				});
			}
		} else {
			winston.error("Failed to find server data for serverNewMember", { svrid: svr.id }, err);
		}
	});
};
