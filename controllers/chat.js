/*
 * Copyright (C) 2016 Aldo Ambrosioni
 * ambrosioni.ict@gmail.com
 * 
 * This file is part of the chat-wolf project
 */

/*jslint node:true*/
/*jslint nomen:true*/
"use strict";

// Requires
var auth = require('../models/auth');
var chat = require('../models/chat');

var config = require('../config/config');
var logger = require('../config/logger');
var error = require('../config/error');

// Get a chat room data
module.exports.getChat = function (req, res, next) {

	// Get parameters
	var chatId = req.params.roomId;

	// Get chat room
	chat.get(chatId, function (chatErr, chatRes) {
		if (chatErr)
			return error.send('500', '1', 'warn', res, 'controllers.chat.getChat', 'Error whle retrieving chat: ' + chatErr);
		else
			res.status(200).send(chatRes);
	});
};

// Create a new chat room
module.exports.newChat = function (req, res, next) {

	// Get parameters
	var name = req.body.hasOwnProperty('name') && req.body.name ? req.body.name : null;
	var password = req.body.hasOwnProperty('password') && req.body.password ? req.body.password : null;
	var owner = req.tokenUser.id;

	chat.new(name, password, owner, function (chatErr, chatRes) {
		if (chatErr)
			return error.send('500', '1', 'warn', res, 'controllers.chat.newChat', 'Error whle creating new chat: ' + chatErr);
		else
			return res.status(200).send(chatRes);
	});
};