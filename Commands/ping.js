const settings = require('../config.json');

module.exports = async (client, msg, suffix) => {
    msg.channel.send({
        embed: {
            color: 0x5491F2,
            author: {
                name: "PoniJS"
            },
            description: `Pong! :ping_pong:`,
            footer: {
                text: `${settings.version}`
            },
        },
    })
}