const getNewServerData = require("./newServerData.js");

module.exports = (client, db, settings, svr, winston) => {
	svr.fetchMembers();
	db.servers.findOne({_id: svr.id}, (err, serverDocument) => {
		if(err || !serverDocument) {
			winston.info(`Joined server '${svr.name}'`, {svrid: svr.id});
			db.servers.create(getNewServerData(client, svr, new db.servers({_id: svr.id})), err => {
				if(err) {
					winston.error("Failed to insert server data", {svrid: svr.id});
				}
			});
		}
	});
};