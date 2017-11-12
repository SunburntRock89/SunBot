const mongoose = require("mongoose");

// Server's member data (activity, rank, etc.)
module.exports = new mongoose.Schema({
	_id: { type: String, required: true },
	// Messages: {type: Number, default: 0, min: 0},
	// voice: {type: Number, default: 0, min: 0},
	last_active: Date,
	cannotAutokick: { type: Boolean, default: false },
	strikes: [new mongoose.Schema({
		_id: { type: String, required: true },
		reason: { type: String, required: true, maxlength: 2000 },
		timestamp: { type: Date, default: Date.now },
	})],
});
