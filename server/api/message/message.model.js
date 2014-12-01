'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  name: String,
  info: String,
  time: String,
  type: String,
  active: Boolean,
  presentationId: String,
  numSlide : String
});

module.exports = mongoose.model('Message', MessageSchema);
