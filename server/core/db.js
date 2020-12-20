const { Sequelize } = require('sequelize');

const db = new Sequelize({
	database: 'ssr-shop',
	username: 'postgres',
	password: '677091418237',
	host: 'localhost',
	port: 5432,
	dialect: 'postgres',
	logging: false
});

db.sync();

module.exports = db;