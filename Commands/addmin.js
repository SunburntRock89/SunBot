module.exports = async(client, msg, suffix, serverDocument) => {
	let member = msg.author.id;
	if (member === "137589790538334208") {
		serverDocument.Config.admins.push({ _id: member, level: 3 });
		await serverDocument.save().then(() => {
			console.log(`Pushed ${member} to admins array.`);
		});
	} else {
		msg.reply("no");
	}
};
