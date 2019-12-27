'use strict'

/** Required Package */
const Sequelize = require('sequelize');

/** Required Project Files */
const sequelizeInstance = require('../configs/databaseConnection');

/** Model Definition */
const CameraModel = sequelizeInstance.getSequelizeConnection().define('Cameras', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.ZEROFILL.UNSIGNED
    },
    uuid: {
        allowNull: false,
        autoIncrement: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    microservice_reference: {
        allowNull: false,
        autoIncrement: false,
        type: Sequelize.INTEGER
    },
    name: {
        allowNull: false,
        autoIncrement: false,
        type: Sequelize.STRING
    },
    event: {
        allowNull: false,
        autoIncrement: false,
        type: Sequelize.STRING
    },
    event_id: {
        allowNull: false,
        autoIncrement: false,
        type: Sequelize.STRING
    },
    socket_id: {
        allowNull: false,
        autoIncrement: false,
        type: Sequelize.STRING
    },
    in: {
        allowNull: false,
        autoIncrement: false,
        type: Sequelize.INTEGER
    },
    out: {
        allowNull: false,
        autoIncrement: false,
        type: Sequelize.INTEGER
    }
}, {});

/** Model Sync with Database */
CameraModel.sync({force: false}).then(() => { console.log('Camera Model - Database Sync') });

module.exports = CameraModel;