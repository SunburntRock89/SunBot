const settings = require("../config.json");
const Discord = require("discord.js");

module.exports = async(client, msg, suffix) => {
	if (settings.maintainers.includes(msg.author.id)) {
		try {
			if (suffix.startsWith("```js") && suffix.endsWith("```")) suffix = suffix.substring(5, suffix.length - 3);
			const asyncify = code => `(async () => {\nreturn ${code.trim()}\n})()`;
			let result = await eval(asyncify(suffix));
			if (typeof result !== "string") result = require("util").inspect(result, false, 1);
			let array = [
				client.token.escapeRegex(),
				settings.token.escapeRegex(),
			];
			let regex = new RegExp(array.join("|"), "g");
			result = result.replace(regex, "Man can never get token");
			msg.channel.send({
				embed: {
					color: 0x00FF00,
					description: `\`\`\`js\n${result}\`\`\``,
				},
			});
		} catch (err) {
			msg.channel.send({
				embed: {
					color: 0xFF0000,
					description: `\`\`\`js\n${err.stack}\`\`\``,
				},
			});
		}
	} else {
		msg.channel.send({
			embed: {
				color: 0xff0000,
				title: `:x: Error!`,
				description: `This command is for a higher rank than you.`,
				footer: {
					text: settings.version,
				},
			},
		});
	}
};
