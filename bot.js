const Discord = require('discord.js');
const settings = require('./config.json');
const client = new Discord.Client();

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
})

client.login(settings.token);