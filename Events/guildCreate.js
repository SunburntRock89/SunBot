module.exports = async(client, winston, svr) => {
	await svr.members.fetch();
	Servers.findOne({ _id: svr.id }, (err, serverDocument) => {
		if (err || !serverDocument) {
			winston.info(`Joined server '${svr.name}'`, { svrid: svr.id });
			Servers.create(new Servers({ _id: svr.id }), (createError, newServerDocument) => {
				if (createError) {
					winston.error("Failed to insert server data", { svrid: svr.id }, createError);
				} else {
					newServerDocument.save();
					svr.members.forEach(member => {
						if (member.permissions.has("MANAGE_GUILD", true) || member.permissions.has("ADMINISTRATOR", true)) {
							winston.log(`${member.username} has ADMINISTRATOR or MANAGE_GUILD.`);
							if (!member.user.bot) {
								if (newServerDocument.Config.admins.id(member.id) === null) {
									newServerDocument.Config.admins.push({ _id: member.id, level: 3 });
									winston.log(`${member.username} pushed.`);
								}
							}
						}
						newServerDocument.save().then(() => {
							winston.log("Added all members with MANAGE_GUILD and ADMINISTRATOR to the admins array.");
						});
						if (svr.roles.find("name", "Staff").id !== null) {
							let staff = svr.roles.find("name", "Staff");
							if (member.roles.has(staff.id)) {
								if (!member.user.bot && newServerDocument.Config.admins.id(member.id) === null) {
									newServerDocument.Config.admins.push({ _id: member.id, level: 1 });
									winston.log(`${member.username} pushed.`);
								}
							}
						}
						newServerDocument.save().then(() => {
							winston.log("Added all members with the role \"Staff\" to the admins array.");
						});
					});
				}
			});
		}
	});
};
