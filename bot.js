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
	if (msg.author.bot) return null;
	if (!msg.content.startsWith(settings.prefix)) return null;
	const cmd = msg.content.split(" ")[0].trim().toLowerCase().replace(settings.prefix, "");
	const suffix = msg.content.split(" ").splice(1).join(" ")
		.trim();
	let cmdFile;
	try {
		cmdFile = require(`./Commands/${cmd}.js`);
	} catch (err) {
		return winston.error(err);
	}
	if (cmdFile) {
		return cmdFile(client, msg, suffix);
	}
});

client.on("ready", () => {
	client.user.setStatus("being developed by the best rock");
	client.user.setStatus("dnd");
	winston.info(`Logged in as ${client.user.username}#${client.user.discriminator}`);
});

client.on("guildCreate", guild => {
	require("./Events/guildCreate")(client, winston, guild);
});

client.login(settings.token);
