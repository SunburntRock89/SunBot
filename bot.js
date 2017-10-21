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
    client.user.setGame("being developed by the best chef");
    client.user.setStatus("dnd");
    console.log("PoniJS [Dan] is online!");
})

Object.assign(String.prototype, {
    escapeRegex() {
        const matchOperators = /[|\\{}()[\]^$+*?.]/g;
        return this.replace(matchOperators, "\\$&");
    },
});


//Devyn-11 Temp Functionality

client.on("guildMemberRemove", gmr => {
    gmr.user.createDM().then(ch => {
        ch.send("Hey, look like you've just been kicked from the test server. Not to worry, we've got you covered! Join back at: https://discord.gg/XMhEwGR")
    })
});



client.on("guildBanAdd", (guild, user) => {
    client.channels.get("370652092127510530").send(`${user.tag} was banned, automatically unbanning!`);
    guild.unban(user);
    user.send("Hey, look like you've just been kicked from the test server. Not to worry, we've got you covered! Join back at: https://discord.gg/XMhEwGR")
});



client.login(settings.token);