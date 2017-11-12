const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const findOrCreate = require("mongoose-findorcreate");
const serverSchema = require("./serverSchema.js");
// Const userSchema = require("./userSchema.js");

// Connect to and setup database
module.exports = {
	initialize: (url, callback) => {
		mongoose.connect(url, {
			autoReconnect: true,
			connectTimeoutMS: 30000,
			socketTimeoutMS: 30000,
			keepAlive: 120,
			poolSize: 100,
		});

		mongoose.model("servers", serverSchema);
		// Mongoose.model("users", userSchema);

		mongoose.connection.on("error", callback);
		mongoose.connection.once("open", callback);
	},
	get: () => mongoose.models,
	getConnection: () => mongoose.connection,
};
