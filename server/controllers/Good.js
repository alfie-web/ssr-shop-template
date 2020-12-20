
const { GoodModel, GoodContentModel } = require('../models');

class Good {
	getAll = async (req, res) => {
		try {
			const goods = await GoodModel.findAll()

			res.json({
				status: 'success',
				data: goods
			})
		} catch (e) {
			console.log(e)
	
			res.status(400).json({
				status: 'error',
				message: `Самсинг вент ронг`
			})
		}
	}

	// Хотя это может быть рационально, получать товары группы, без самой группы
	// getByGroup = async (req, res) => {
	// 	const groupId = req.params.groupId;

	// 	try {
	// 		const finded = await GoodModel.findAll({
	// 			include: [{
	// 				...
	// 			}]
	// 		})

	// 		res.json({
	// 			status: 'success',
	// 			data: finded
	// 		})
	// 	} catch (e) {
	// 		console.log(e)
	// 		res.status(400).json({
	// 			status: 'error',
	// 			message: `Самсинг вент ронг`
	// 		})
	// 	}
	// }

	getContent = async (req, res) => {
		const GoodId = req.params.goodId;

		try {
			const findedGood = await GoodContentModel.findOne({
				where: {
					GoodId
				},
				include: [{
					model: GoodModel,
				}]
			});

			console.log(findedGood);

			res.json({
				status: 'success',
				data: findedGood
			})

		} catch (e) {
			console.log(e)
			res.status(400).json({
				status: 'error',
				message: `Самсинг вент ронг`
			})
		}
	}

	create = async (req, res) => {
		const postData = {
			title: req.body.title,
			cost: req.body.cost,
			tags: req.body.tags ? ['all', ...req.body.tags] : ["all"],
			smallDescription: req.body.smallDescription,
			description: req.body.description,
			sizes: req.body.sizes,
			brand: req.body.brand,
			images: req.body.images
		}

		try {
			const newGood = await GoodModel.create({ 
				title: postData.title, 
				cost: postData.cost,
				brand: postData.brand,
				images: postData.images,
				sizes: postData.sizes,
				tags: postData.tags
			});

			const newGoodContent = await GoodContentModel.create({
				smallDescription: postData.smallDescription,
				description: postData.description,
				GoodId: newGood._id
			})

			// newGoodContent.addGood(newGood._id)

			console.log('newGood', newGood)
			console.log('newGoodContent', newGoodContent)

			res.json({
				status: 'success',
				data: newGood
			})
		} catch (e) {
			console.log(e)
	
			res.status(400).json({
				status: 'error',
				message: `Самсинг вент ронг`
			})
		}
	}
}

module.exports = Good