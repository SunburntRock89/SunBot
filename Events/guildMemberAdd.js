// Member joined server
module.exports = (client, db, config, winston, svr, member, guild) => {
	// Get server data
	db.servers.findOne({ _id: svr.id }, (err, serverDocument) => {
		if (!err && serverDocument) {
			winston.info(`Member '${guild.member.user.username}' joined server '${svr.name}'`, { svrid: svr.id, usrid: guild.member.id });
		} else {
			winston.error("Failed to find server data for serverNewMember", { svrid: svr.id }, err);
		}
	});
};
