const Discord = require("discord.js");
const settings = require("./config.json");
const client = new Discord.Client();
const database = require("./Schemas/Database.js");
const winston = require("winston");

winston.add(winston.transports.File, {
	filename: "bot-out.log",
});

const eventHandlers = {
	guildCreate: require("./Events/guildCreate.js"),
	guildMemberAdd: require("./Events/guildMemberAdd.js"),
};

database.initialize(settings.mongoURL, err => {
	if (err) {
		winston.error("Failed to connect to database", err);
	} else {
		const db = database.get();

		client.on("guildCreate", svr => {
			eventHandlers.guildCreate(client, db, settings, winston, svr); // .catch(err => {
			// winston.error(err);
			// });
		});

		client.on("guildMemberAdd", (svr, member, guild) => {
			eventHandlers.guildMemberAdd(client, db, settings, winston, svr, guild, member); // .catch(err => {
			// winston.error(err);
			// });
		});
	}
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
	client.user.setGame("being developed by the best rock");
	client.user.setStatus("dnd");
	winston.info(`Logged in as ${client.user.username}#${client.user.discriminator}`);
});

Object.assign(String.prototype, {
	escapeRegex() {
		const matchOperators = /[|\\{}()[\]^$+*?.]/g;
		return this.replace(matchOperators, "\\$&");
	},
});

// Client.on("guildMemberAdd")


client.login(settings.token);
