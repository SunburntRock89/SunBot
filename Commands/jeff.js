module.exports = async (client, msg, suffix) => {
        msg.channel.send({
            embed: {
                color: 0x5491F2,
                author: {
                    name: "PoniJS"
                },
                description: `Bad meme.`,
                footer: {
                    text: `v.0.01 ALPHA`
                },
            },
        })
}