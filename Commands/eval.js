const settings = require('../config.json');
const Discord = require('discord.js');

module.exports = async (client, msg, suffix) => {
    if (settings.maintainers.some(id => msg.author.id === id)) {
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
			result = result.replace(regex, "Vlag Dissaproves");
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
            message.reply("no")
        }
}