const { DataTypes } = require('sequelize');

const db = require('../core/db');
// const { GoodModel } = require('./index');
const GoodModel = require('./Good');
const GroupModel = require('./Group');

// console.log('GoodModel', GoodModel)

// В postgresql чтобы сделать связь many-to-many, нужно создать связывающую таблицу
// В ней будут храниться все  товары в разных группах и группы с разными товарами

const GroupGoodsModel = db.define('GroupGoods', {
	GroupId: {
		type: DataTypes.STRING,
		references: {
			model: GroupModel, // 'Movies' would also work
			key: '_id'
		},
		onDelete: 'cascade'	// штука вродь как нужна, чтобы когда удаляется объект, удалялись и связанные
	},
	GoodId: {
		type: DataTypes.STRING,
		references: {
			model: GoodModel, // 'Actors' would also work
			key: '_id'
		},
		onDelete: 'cascade'
	}
})
GroupModel.belongsToMany(GoodModel, { through: GroupGoodsModel });
GoodModel.belongsToMany(GroupModel, { through: GroupGoodsModel });


// console.log('MODELS', db.models)
// console.log('111111111')

module.exports = GroupGoodsModel;
