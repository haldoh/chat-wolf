/*
 * Copyright (C) 2016 Aldo Ambrosioni
 * ambrosioni.ict@gmail.com
 * 
 * This file is part of the chat-wolf project
 */

/*jslint node:true*/
/*jslint nomen:true*/
"use strict";

// Print a default message
module.exports.defaultMessage = function (req, res) {
	res.status(200).send('chat-wolf - Chat layer for Wolf\'s applications.');
};