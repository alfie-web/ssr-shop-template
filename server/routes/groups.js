const express = require('express');
const { GroupController } = require('../controllers');

const groupsRoutes = express.Router();

const groupsCtrl = new GroupController;

groupsRoutes.get('/', groupsCtrl.getAll);
groupsRoutes.get('/goods', groupsCtrl.getGoodsByGroup);
// groupsRoutes.get('/goods/:groupId', groupsCtrl.getGoodsByGroup);
groupsRoutes.get('/:id', groupsCtrl.getById);
groupsRoutes.post('/create', groupsCtrl.create);
groupsRoutes.patch('/update', groupsCtrl.update);
groupsRoutes.delete('/remove', groupsCtrl.remove);
groupsRoutes.put('/addGoods', groupsCtrl.addGoods);
groupsRoutes.delete('/removeGoods', groupsCtrl.removeGoods);

module.exports = groupsRoutes