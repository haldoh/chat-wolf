/*
 * Copyright (C) 2016 Aldo Ambrosioni
 * ambrosioni.ict@gmail.com
 * 
 * This file is part of the chat-wolf project
 */

/*jslint node:true*/
/*jslint nomen:true*/
"use strict";

// Logger initialization
require('./config/logger').initialize();

// Connect to MongoDB and setup mongoose
require('./config/mongoose')();

// Configure express app and server
var server = require('./config/express')();

// Configure socket.io
require('./config/socketio.js')(server);

module.exports = server;