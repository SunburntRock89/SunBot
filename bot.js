const Discord = require('discord.js');
const settings = require('./config.json');
const client = new Discord.Client();

var mongoose = require('mongoose');
mongoose.connect(`${settings.mongoUrl}`, { useMongoClient: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Mongoose connected successfully")
});


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
    client.user.setGame("being developed by the best rock");
    client.user.setStatus("dnd");
    console.log(`Logged in as ${client.user.username}#${client.user.discriminator}`);
})

Object.assign(String.prototype, {
    escapeRegex() {
        const matchOperators = /[|\\{}()[\]^$+*?.]/g;
        return this.replace(matchOperators, "\\$&");
    },
});

client.login(settings.token);