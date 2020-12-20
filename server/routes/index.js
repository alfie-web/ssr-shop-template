const express = require('express');
const cors = require('cors');

const corsOptions = {
	origin: process.env.CLIENT_URL,	// Настроил откуда можно делать запросы к api
	credentials: true
}

const createRoutes = (app) => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));		// Эта штука нужна если мы отправляем данные из формы (файлы например)
	app.use(cors(corsOptions));

	app.use('/goods', require('./goods'));
	app.use('/groups', require('./groups'));

	app.use('/uploads', express.static(__dirname + '/uploads'));
}

module.exports = createRoutes;