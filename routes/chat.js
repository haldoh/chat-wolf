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
var express = require('express');
var router = express.Router();
var auth = require('../controllers/auth');
var chat = require('../controllers/chat');

// All routes require api tokens
router.use(auth.checkApiToken);

router.route('/chat_token')
	// GET - Get a temporary token to authenticate chat socket
	.get(auth.checkUserToken, auth.getTempChatToken);

router.route('/room')
	// POST - Create a new chat room
	.post(auth.checkUserToken, chat.newChat);

router.route('/room/:roomId')
	// GET - Get a room data
	.get(auth.checkUserToken, chat.getChat);

module.exports = router;