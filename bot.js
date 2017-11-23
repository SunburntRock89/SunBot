const Discord = require("discord.js");
const settings = require("./config.json");
const client = new Discord.Client();
const database = require("./Schemas/Database.js");
const winston = require("winston");

Object.assign(String.prototype, {
	escapeRegex() {
		const matchOperators = /[|\\{}()[\]^$+*?.]/g;
		return this.replace(matchOperators, "\\$&");
	},
});

winston.add(winston.transports.File, {
	filename: "bot-out.log",
});

database.initialize(settings.mongoURL).then(db => {
	winston.info(`Database Loaded!`);
}).catch(err => {
	winston.error(`Failed to launch Database, this is probably your fault you Mongo`, err);
	process.exit(1);
});

client.on("message", async msg => {
	let prefix = (await Servers.findOne({ _id: msg.guild.id })).Config.command_prefix;
	if (msg.author.bot) return null;
	if (!msg.content.startsWith(prefix)) return null;
	if (!msg.guild) return;
	const cmd = msg.content.split(" ")[0].trim().toLowerCase().replace(prefix, "");
	const suffix = msg.content.split(" ").splice(1).join(" ")
		.trim();
	let cmdFile;
	try {
		cmdFile = require(`./Commands/${cmd}.js`);
	} catch (err) {
		return winston.error(err);
	}
	if (cmdFile) {
		return cmdFile(client, msg, suffix, await Servers.findOne({ _id: msg.guild.id }));
	}
});

client.on("ready", () => {
	client.user.setStatus("being developed by the best irish boy");
	client.user.setStatus("online");
	winston.info(`Logged in as ${client.user.username}#${client.user.discriminator}`);
	require("./Events/ready")(client, winston);
});

client.memberSearch = (string, server) => new Promise((resolve, reject) => {
	let foundMember;
	string = string.trim();

	if (string.startsWith("<@!")) {
		foundMember = server.members.get(string.slice(3, -1));
	} else if (string.startsWith("<@")) {
		foundMember = server.members.get(string.slice(2, -1));
	} else if (!isNaN(string) && new RegExp(/^\d+$/).test(string)) {
		foundMember = server.members.get(string);
	} else if (string.startsWith("@")) {
		string = string.slice(1);
	}
	if (string.lastIndexOf("#") === string.length - 5 && !isNaN(string.substring(string.lastIndexOf("#") + 1))) {
		foundMember = server.members.filter(member => member.user.username === string.substring(0, string.lastIndexOf("#") + 1))
			.find(member => member.user.discriminator === string.substring(string.lastIndexOf("#") + 1));
	}
	if (!foundMember) {
		foundMember = server.members.find(member => member.user.username.toLowerCase() === string.toLowerCase());
	}
	if (!foundMember) {
		foundMember = server.members.find(member => member.nickname && member.nickname.toLowerCase() === string.toLowerCase());
	}
	if (foundMember) {
		resolve(foundMember);
	} else {
		reject(new Error(`Couldn't find a member in ${server} using string "${string}"`));
	}
});

client.on("guildCreate", guild => {
	require("./Events/guildCreate")(client, winston, guild);
});

// client.on("guildMemberAdd", guild => {
// 	require("./Events/guildMemberAdd")(client, winston, guild);
// });

client.login(settings.token);
