const settings = require("../config.json");

module.exports = async(client, msg, suffix) => {
	msg.channel.send({
		embed: {
			color: 0x5491F2,
			author: {
				name: "Pong!",
			},
			description: `Took ${Math.floor(client.ping)}ms :ping_pong:`,
			footer: {
				text: `${settings.version}`,
			},
		},
	});
};
