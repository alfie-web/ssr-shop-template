const { DataTypes } = require('sequelize');

const db = require('../core/db');

const GoodModel = db.define('Good', {
	_id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	cost: {
		type: DataTypes.BIGINT,
		allowNull: false
	},
	brand: {
		type: DataTypes.STRING
	},
	images: {
		type: DataTypes.ARRAY(DataTypes.STRING),
		defaultValue: []
	},
	tags: {
		type: DataTypes.ARRAY(DataTypes.STRING),
		defaultValue: []
	},
	sizes: {
		type: DataTypes.ARRAY(DataTypes.STRING),
		defaultValue: []
	}
}, {
	timestamps: true
});

module.exports = GoodModel;