/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Presentation = require('./presentation.model');

exports.register = function(socket) {
  Presentation.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Presentation.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
  socket.on('pageNumber', function (data) {
    //broadcasting the message to all clients
	socket.broadcast.emit('pageNumber',data);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('presentation:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('presentation:remove', doc);
}