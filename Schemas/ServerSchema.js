const mongoose = require("mongoose");

// Schema for a server
module.exports = new mongoose.Schema({
	_id: { type: String, required: true },
	// Config: require("./serverConfigSchema.js"),
	// extensions: [require("./modulesSchema.js")],
	members: [require("./serverMemberSchema.js")],
	// Games: [require("./serverGamesSchema.js")],
	// channels: [require("./serverChannelsSchema.js")],
	messages_today: { type: Number, default: 0 },
});
