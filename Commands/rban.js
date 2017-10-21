module.exports = async (client, msg, suffix) => {
    let reason = msg.content.split(/\s+/g).slice(2).join(" ");    
    if(msg.mentions.users.size !== 0) {
        msg.channel.send({
            embed: {
                color: 0x5491F2,
                author: {
                    name: "PoniJS"
                },
                description: `${msg.mentions.users.first().tag} has been banned`,
                footer: {
                    text: `You now have ${msg.guild.memberCount - 1} members.`
                },
            },
        })
    } else {
        msg.reply("You need to mention the user you want to ban or mention them via their ID.")
    }
}