const db = require("../models");
const dbConfig = require("../config/db.config.js");
const logger = require("../utils/logger")(__filename);

module.exports = {
    initDatabase: async () => {
        try {
            await db.sequelize.authenticate();

            logger.info(`Successfully connected to MySQL database: ${dbConfig.DB}`);
            await db.sequelize.sync();

            // await db.sequelize.sync({ force: true });
            // console.log("Drop and re-sync db.");
        } catch(err) {
            logger.error(`Unable to connect to the database: ${err}`);
        }
    }
}
