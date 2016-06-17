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

// All routes require api tokens
router.use(auth.checkApiToken);

router.route('/chat_token')
	// GET - Get a temporary token to authenticate chat socket
	.get(auth.checkUserToken, auth.getTempChatToken);


module.exports = router;