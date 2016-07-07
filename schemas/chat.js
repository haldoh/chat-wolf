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
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// Schema for a chat room
var ChatSchema = new mongoose.Schema({
	name: { type: String },
	password: { type: String },
	created: { type: Date },
	updated: { type: Date, required: true, 'default': Date.now, expires: (60 * 60 * 24) },
	owner: { type: String },
	users: [{ type: String }]
});

// Generate a password hash using bcrypt
ChatSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Check password hash using bcrypt
ChatSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.xChat.model('Chat', ChatSchema);