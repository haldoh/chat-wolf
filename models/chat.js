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
var Chat = require('mongoose').xChat.model('Chat');

// Find a chat by ID
module.exports.get = function (chatId, callback) {
	Chat.findById(chatId, function (err, res) {
		if (err)
			callback(err);
		else {

			// Turn returned object to json
			var chatRoom = res.toJSON();

			// Remove sensitive data
			delete chatRoom.password;

			// Callback with result
			callback(null, chatRoom);
		}
	});
};

// Create a new chat chat room
module.exports.new = function (name, password, owner, callback) {

	// Create object with chat data
	var date = new Date();
	var params = {
		name: name,
		created: date,
		updated: date,
		owner: owner,
		users: [owner]
	};

	// Create new chat object
	var newChat = new Chat(params);

	// Store password if given
	if (password)
		newChat.password = newChat.generateHash(password);
	else
		newChat.password = null;

	// Store in DB
	newChat.save(function (err, res) {
		if (err)
			callback(err);
		else {

			// Turn returned object to json
			var chatRoom = res.toJSON();

			// Remove sensitive data
			delete chatRoom.password;

			// Callback with result
			callback(null, chatRoom);
		}
	});
};