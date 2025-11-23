const { Sequelize } = require('sequelize');
require('dotenv').config();

// Prefer a full connection URL if provided (useful for proxied DBs like Railway)
const connectionUrl = process.env.MYSQL_URL || process.env.MYSQL_PUBLIC_URL || process.env.DATABASE_URL || process.env.DB_URL;

const commonOptions = {
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

let sequelize;
if (connectionUrl) {
    // If a complete URL is provided, pass it directly to Sequelize
    sequelize = new Sequelize(connectionUrl, commonOptions);
} else {
    // Otherwise build connection from individual env vars
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        Object.assign({}, commonOptions, {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined
        })
    );
}

module.exports = sequelize;
