'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PresentationSchema = new Schema({
  title: String,
  description: String,
  pdfPath: String,
  userId: Object,
  date_creation: String,
  page: Number,
  password: String
});

module.exports = mongoose.model('Presentation', PresentationSchema);