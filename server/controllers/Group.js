
const { GroupModel, GoodModel } = require('../models');

class Group {

	// Получаем все группы
	// TODO: В дальнейшем будет пагинация
	getAll = async (req, res) => {
		// Тут то оно мне не нужно по факту, для пагинации по клику на кнопку показать ещё будет отдельный роут вообще
		// const currentGroupPage = 0;
		// const groupLimit = 3;

		// const groupOffset = groupLimit * currentGroupPage;
		// const groupIsLastPage = groupOffset + groupLimit >= feedItemsCount;		// Тогда это придётся делать на фронте, хотя хз как

		// const groupItemsCount = GroupModel.count()

		try {
			// const groups = await GroupModel.findAll({
			// 	include: [{		// вместе с товарами
			// 		model: GoodModel,
			// 		// offset: 5, 
			// 		// limit: 3	// Вот дела, эта штука вообще не работает со связью many-to-many
			// 		// Единственный верный способ, это 2 запроса
			// 		// Первый на получение групп, без товаров
			// 		// Затем на фронте перебирая в цикле на кождую итерацию делать запрос на получение товаров
			// 		// Там уже можно лимитировать
			// 	}]
			// })

			const groups = await GroupModel.findAll({
				order: [
					// Will escape title and validate DESC against a list of valid direction parameters
					['createdAt', 'DESC'],
				],
				include: [
					{
						model: GoodModel,
						// attributes: ['_id', 'name', 'cost', 'image', 'tags', 'createdAt', 'updatedAt'],
						// as: 'goods',	// Всякие возможности
						// where: {isDelete: false} // ticket object will be blank if comment not found; 
						separate: true,
						limit: 4
					}
				],
			})

			res.json({
				status: 'success',
				data: groups
			})
		} catch (e) {
			console.log(e)
	
			res.status(400).json({
				status: 'error',
				message: `Самсинг вент ронг`
			})
		}
	}

	// getAll = async (req, res) => {
	// 	try {
	// 		const groups = await GroupModel.findAll({
	// 			include: [{		// вместе с товарами
	// 				model: GoodModel
	// 			}]
	// 		})

	// 		res.json({
	// 			status: 'success',
	// 			data: groups
	// 		})
	// 	} catch (e) {
	// 		console.log(e)
	
	// 		res.status(400).json({
	// 			status: 'error',
	// 			message: `Самсинг вент ронг`
	// 		})
	// 	}
	// }

	getGoodsByGroup = async (req, res) => {
		const groupId = req.query.group;
		const position = req.query.position;

		const limit = 3;
		const skip = limit * position;

		console.log('SKIP', skip)

		try {
			const findedGroup = await GroupModel.findByPk(groupId);
			const totalGoodsCount = await findedGroup.countGoods();
			const isLastPage = skip + limit >= totalGoodsCount;

			// console.log('totalGoodsCount', totalGoodsCount)

			const goods = await findedGroup.getGoods({
				limit,
				offset: skip,
				order: [
					['createdAt', 'DESC'],		// DESC, ASC
				]
			})

			res.json({
				status: 'success',
				data: {
					goods,
					isLastPage
				}
			})
		} catch (e) {
			res.status(400).json({
				status: 'error',
				message: `Самсинг вент ронг`
			})
		}
	}

	getById = async (req, res) => {
		const groupId = req.params.id;

		try {
			// const findedGroup = await GroupModel.findByPk(groupId);
			const findedGroup = await GroupModel.findOne({
				where: {
					_id: groupId
				},
				include: [
					{
						model: GoodModel,
						// attributes: ['_id', 'name', 'cost', 'image', 'tags', 'createdAt', 'updatedAt'],
						// as: 'goods',	// Всякие возможности
						// where: {isDelete: false} // ticket object will be blank if comment not found; 
					}
				],
				// attributes: ['ticketId', 'ticketNumber', 'title', 'description', 'type', 'severity', 'status', 'userId'],
			});

			res.json({
				status: 'success',
				data: findedGroup
			})
		} catch (e) {
			res.status(400).json({
				status: 'error',
				message: `Самсинг вент ронг`
			})
		}
	}

	// Создаём группу, а если есть товары, то сразу добавляем их в созданную группу
	create = async (req, res) => {
		try {
			const postData = {
				name: req.body.name,
				goods: req.body.goods
			}

			const newGroup = await GroupModel.create({ 
				name: postData.name
			});

			// И это работает. Также доступны методы addGood, setGood, hasGood, removeGood, createGood, countGood
			// hasGoods, addGoods, setGoods, removeGoods
			// const newGood = await newGroup.createGood({
			// 	name: 'test', 
			// 	cost: 777,
			// 	image: null,
			// 	tags: ["test"]
			// })

			postData.goods && await newGroup.addGoods(postData.goods)

			// console.log(newGood)

			res.json({
				status: 'success',
				data: newGroup
			})
		} catch (e) {
			console.log(e)
	
			res.status(400).json({
				status: 'error',
				message: `Самсинг вент ронг`
			})
		}
	}

	// Обновляем данные группы (name)
	update = async (req, res) => {
		const groupId = req.body.groupId;
		const name = req.body.name;

		try {
			const findedGroup = await GroupModel.findByPk(groupId);		// поиск по первичному ключу
			if (findedGroup) {
				const updatedGroup = await findedGroup.update({
					name
				});

				return res.json({
					status: 'success',
					data: updatedGroup
				})
			}

			res.status(404).json({
				status: 'error',
				message: `Группа не найдена`
			})

		} catch (e) {
			res.status(400).json({
				status: 'error',
				message: `Самсинг вент ронг`
			})
		}
	}

	// Удаляем группу и связанные товары из таблицы связей GroupGoods
	remove = async (req, res) => {
		const groupId = req.body.groupId;

		try {
			const findedGroup = await GroupModel.findByPk(groupId);

			if (findedGroup) {
				await findedGroup.destroy()		// удаляет
					
				return res.json({
					status: 'success'
				})
			}

			res.status(404).json({
				status: 'error',
				message: `Группа не найдена`
			})

		} catch (e) {
			res.status(400).json({
				status: 'error',
				message: `Самсинг вент ронг`
			})
		}


	}

	// Добавляем товар в группу
	addGoods = async (req, res) => {
		const postData = {
			groupId: req.body.groupId,
			goods: req.body.goods		// массив goodId-шек
		}

		try {
			const findedGroup = await GroupModel.findByPk(postData.groupId);
			// await findedGroup.addGood(postData.goodId)
			await findedGroup.addGoods(postData.goods)

			res.json({
				status: 'success',
			})
	
		} catch (e) {
			res.status(400).json({
				status: 'error',
				message: 'Ошибка'
			})
		}
	}

	// Удаляем товар из группы
	removeGoods = async (req, res) => {
		const postData = {
			groupId: req.body.groupId,
			goods: req.body.goods
		}

		try {
			const findedGroup = await GroupModel.findByPk(postData.groupId);
			await findedGroup.removeGoods(postData.goods);

			res.json({
				status: 'success',
			})
	
		} catch (e) {
			res.status(400).json({
				status: 'error',
				message: 'Ошибка'
			})
		}
	}
}

module.exports = Group;






















