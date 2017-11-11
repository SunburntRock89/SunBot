module.exports = async (client, msg, suffix) => {
    let reason = msg.content.split(/\s+/g).slice(2).join(" ");    
    if(msg.mentions.users.size !== 0) {
        try {
            msg.channel.send({
                embed: {
                    color: 0x5491F2,
                    author: {
                        name: "SunBot"
                    },
                    description: `${msg.mentions.users.first().tag} has been banned`,
                    footer: {
                        text: `You now have ${msg.guild.memberCount} members.`
                    },
                },
            })
            msg.mentions.members.first().ban(reason)
        } catch (err) {
            console.log(err)
        }
    } else {
        //msg.channel.guild.ban()
        msg.reply("You need to mention the user you want to ban or mention them via their ID.")
    }
}