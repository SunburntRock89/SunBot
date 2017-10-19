const Discord = require('discord.js');
const settings = require('./config.json');
const client = new Discord.Client();

<<<<<<< HEAD
client.on("message", async msg => {
    if (msg.author.bot) return null;
    if (!msg.content.startsWith(settings.prefix)) return null;
    const cmd = msg.content.split(" ")[0].trim().toLowerCase().replace(settings.prefix, "");
    const suffix = msg.content.split(" ").splice(1).join(" ").trim();
    let cmdFile;
    try {
        cmdFile = require(`./Commands/${cmd}.js`);
    } catch (err) {
        return console.error(err);
    }
    if (cmdFile) {
        return await cmdFile(client, msg, suffix);
    }
});


client.on('ready', () => {
    client.user.setGame("being developed by the best death");
    client.user.setStatus("dnd");
    console.log("PoniJS [Rhys] is online!");
=======
client.on('message', message => {
	if (message.content.startsWith(settings.prefix + "ping")) {
		const embed = new Discord.RichEmbed();
		embed.setTitle("PoniJS")
		.setDescription("Pong! :ping_pong:")
		.setColor("#5491F2")
		.setFooter("v0.01 ALPHA")
		message.channel.sendEmbed(embed);
	}
})

client.on('ready', () => {
	client.user.setGame("being developed by the best chef");
	client.user.setStatus("dnd");
	console.log("PoniJS [Dan] is online!");
>>>>>>> master
})

client.login(settings.token);