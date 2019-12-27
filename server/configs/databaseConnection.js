'use strict'

/** Required Packages */
const Sequelize = require('sequelize');

/** Required Project Files */
const config = require('./config');

/** Sequelize Instance Variable */
let sequelizeConnection = null;

/** Function to Create Sequelize Instance */
function getSequelizeConnection () {
    try {
        if (!sequelizeConnection) {
            sequelizeConnection = new Sequelize(
                config.dbName,
                config.dbUserName,
                config.dbPassword,
                {
                    host: config.dbHost,
                    dialect: config.dbDialect
                }
            );

            return sequelizeConnection;
        }

        return sequelizeConnection;

    } catch (error) {
        console.log(error);
    }
}

module.exports = { getSequelizeConnection };

