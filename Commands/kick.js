module.exports = async (client, msg, suffix) => {
    let reason = msg.content.split(/\s+/g).slice(2).join(" ");  
    if(msg.mentions.users.size !== 0) {
        try {
            msg.mentions.members.first().kick(reason)
        } catch (err) {
            msg.channel.send({
                embed: {
                    color: 0xFF0000,
                    title: ":x: Error",
                    description: err,
                    footer: {
                        text: settings.version
                    }
                }
            });
        }
        msg.channel.send({
            embed: {
                color: 0x5491F2,
                author: {
                    name: "SunBot"
                },
                description: `${msg.mentions.users.first().tag} has been kicked.`,
                footer: {
                    text: `You now have ${msg.guild.memberCount} members.`
                },
            },
        })
    } else {
        //msg.channel.guild.ban()
        msg.reply("You need to mention the user you want to kick or mention them via their ID.")
    }
}