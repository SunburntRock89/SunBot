const settings = require("../config.json");

module.exports = async(client, msg, suffix) => {
	msg.channel.send({
		embed: {
			color: 0x5491F2,
			author: {
				name: "SunBot",
			},
			description: `Pong! Took ${client.ping} :ping_pong:`,
			footer: {
				text: `${settings.version}`,
			},
		},
	});
};
