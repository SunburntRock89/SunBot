const mongoose = require("mongoose");

// Server's configs (commands, admins, etc.)
module.exports = {
	admins: [new mongoose.Schema({
		_id: { type: String, required: true },
		level: { type: Number, default: 1, enum: [1, 2, 3] },
	})],
	command_prefix: { type: String, default: "-", maxlength: 10, minlength: 1 },
	moderation: {
		isEnabled: { type: Boolean, default: true },
		status_messages: {
			server_name_updated_message: {
				isEnabled: { type: Boolean, default: false },
				channel_id: String,
			},
			server_icon_updated_message: {
				isEnabled: { type: Boolean, default: false },
				channel_id: String,
			},
			server_region_updated_message: {
				isEnabled: { type: Boolean, default: false },
				channel_id: String,
			},
			new_member_message: {
				isEnabled: { type: Boolean, default: false },
				channel_id: String,
				messages: { type: String, default: "test" },
			},
			member_nick_updated_message: {
				isEnabled: { type: Boolean, default: false },
				channel_id: String,
			},
			member_removed_message: {
				isEnabled: { type: Boolean, default: false },
				channel_id: String,
				messages: [String],
			},
			member_removed_pm: {
				isEnabled: { type: Boolean, default: false },
				message_content: String,
			},
			member_banned_message: {
				isEnabled: { type: Boolean, default: false },
				channel_id: String,
				messages: [String],
			},
			member_unbanned_message: {
				isEnabled: { type: Boolean, default: false },
				channel_id: String,
				messages: [String],
			},
			message_edited_message: {
				isEnabled: { type: Boolean, default: false },
				type: { type: String, default: "msg", enum: ["msg", "single"] },
				channel_id: String,
				enabled_channel_ids: [String],
			},
			message_deleted_message: {
				isEnabled: { type: Boolean, default: false },
				type: { type: String, default: "msg", enum: ["msg", "single"] },
				channel_id: String,
				enabled_channel_ids: [String],
			},
		},
		new_member_roles: [String],
	},
};
