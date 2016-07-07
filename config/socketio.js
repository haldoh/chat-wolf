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
var socketio = require('socket.io');
var socketAuth = require('socketio-auth');

var auth = require('../models/auth');

var logger = require('../config/logger');

// socket.io configuration
module.exports = function (server) {

	// Server-side socket
	var io = socketio.listen(server);

	socketAuth(io, {
		authenticate: authenticate,
		postAuthenticate: postAuthenticate,
		timeout: 1000
	});

	// Socket behaviour
	io.sockets.on('connection', function (socket) {

		logger.debug('Connection from socket: ' + socket.id);

		// Client registration
		// socket.on('clientRegister', function (clientId) {
		// });

		// Direct message between clients
		socket.on('directMessage', function (senderId, recipientId, message) {
			socket.broadcast.to(recipientId).emit('directMessage', senderId, message);
		});

		// Join a room
		socket.on('joinRoom', function (roomId) {
			logger.debug('Socket ' + socket.id + ' joining room ' + roomId);
			socket.join(roomId);
			io.to(roomId).emit('joinedRoom', socket.id);
		});

		// Leave a room
		socket.on('leaveRoom', function (roomId) {
			logger.debug('Socket ' + socket.id + ' leaving room ' + roomId);
			socket.leave(roomId);
			io.to(roomId).emit('leftRoom', socket.id);
		});

		// Message to a room
		socket.on('messageRoom', function (roomId, senderId, message) {
			io.to(roomId).emit('messageRoom', senderId, message);
		});

		// Disconnection management
		// socket.on('disconnect', function () {
		// });

	});
};

function authenticate (socket, data, callback) {

	// Check token
	return auth.verifyTempChatToken(data.token, function (tokenErr, decodedToken) {
		if (tokenErr) {
			logger.warn('Socket authentication error: ' + tokenErr);
			return callback(new Error(tokenErr));
		} else {
			// Store decoded info in socket
			socket.xClient = decodedToken;
			// Callback with positive result
			return callback(null, true);
		}
	});
}

function postAuthenticate (socket, data) {
	logger.debug('User authenticated: ' + socket.xClient.id);
}