const getNewServerData = require("./newServerData.js");

module.exports = async(client, winston, svr) => {
	await svr.members.fetch();
	Servers.findOne({ _id: svr.id }, (err, serverDocument) => {
		if (err || !serverDocument) {
			winston.info(`Joined server '${svr.name}'`, { svrid: svr.id });
			Servers.create(new Servers({ _id: svr.id }), createError => {
				if (createError) {
					winston.error("Failed to insert server data", { svrid: svr.id }, createError);
				}
			});
		}
	});
};
