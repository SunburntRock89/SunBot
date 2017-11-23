module.exports = async(client, msg, suffix, serverDocument) => {
	if (serverDocument.Config.admins.some(admin => admin._id === msg.author.id && admin.level === 3)) {
		msg.reply(`hello admin`);
	} else {
		msg.reply(`u no admin`);
	}
};
