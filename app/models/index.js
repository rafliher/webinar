const config = require("../configs/db.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions,
    timezone: config.timezone,
    logging: false,
    define: {
        collate: config.collate,
        charset: config.charset,
    }
}
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.responses = require("./response.js")(sequelize, Sequelize);

module.exports = db;