const { DataTypes } = require('sequelize');
const db = require('../core/db');

const GoodContentModel = db.define('GoodContent', {
	_id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	smallDescription: {
		type: DataTypes.TEXT,
		defaultValue: ""
	},
	description: {
		type: DataTypes.TEXT,
		defaultValue: ""
	},
	// images: {
	// 	type: DataTypes.ARRAY(DataTypes.STRING),
	// 	defaultValue: []
	// }
})

module.exports = GoodContentModel;