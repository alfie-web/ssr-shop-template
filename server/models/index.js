
const GoodModel = require('./Good');
const GroupModel = require('./Group');
const GoodContentModel = require('./GoodContent');

// Один-ко многим
GroupModel.hasMany(GoodModel);

// GoodContentModel.hasOne(GoodModel);

// Один-к-одному при этом у GoodContentModel появится свойство GoodId
GoodModel.hasOne(GoodContentModel);
GoodContentModel.belongsTo(GoodModel);

module.exports = {
	GoodModel,
	GoodContentModel,
	GroupModel,
	// GroupGoodsModel: require('./GroupGoods'),
}	