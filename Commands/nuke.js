const settings = require("../config.json");

module.exports = async(client, msg, suffix) => {
	let messageCount = msg.content.split(/\s+/g).slice(2).join(" ");
	if (messageCount !== 0) {
		msg.channel.send({
			embed: {
				color: 0x5491F2,
				author: {
					name: "SunBot",
				},
				description: `Nuked ${messageCount} messages.`,
				footer: {
					text: `${settings.version}`,
				},
			},
		});
		msg.channel.batchDelete(messageCount);
	} else {
		msg.reply("You need to specify a number of messages to delete.");
	}
};
