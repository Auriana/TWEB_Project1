'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PresentationSchema = new Schema({
  title: String,
  description: String,
  pdfPath: String,
  page: Number
});

module.exports = mongoose.model('Presentation', PresentationSchema);