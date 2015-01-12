'use strict';

var _ = require('lodash');
var Presentation = require('./presentation.model');

// Get list of presentations
exports.index = function(req, res) {
  Presentation.find(function (err, presentations) {
    if(err) { return handleError(res, err); }
    return res.json(200, presentations);
  });
};

// Get a single presentation
exports.show = function(req, res) {
  Presentation.findById(req.params.id, function (err, presentation) {
    if(err) { return handleError(res, err); }
    if(!presentation) { return res.send(404); }
    return res.json(presentation);
  });
};

// Get a single presentation by pw
exports.showByPw = function(req, res) {
  Presentation.findOne({password : req.params.pw}).exec(function (err, presentation) {
    if(err) { return handleError(res, err); }
    if(!presentation) { return res.send(404); }
    return res.json(presentation);
  });
};

// Creates a new presentation in the DB.
exports.create = function(req, res) {
  Presentation.create(req.body, function(err, presentation) {
    if(err) { return handleError(res, err); }
    return res.json(201, presentation);
  });
};

// Updates an existing presentation in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Presentation.findById(req.params.id, function (err, presentation) {
    if (err) { return handleError(res, err); }
    if(!presentation) { return res.send(404); }
    var updated = _.merge(presentation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, presentation);
    });
  });
};

// Deletes a presentation from the DB.
exports.destroy = function(req, res) {
  Presentation.findById(req.params.id, function (err, presentation) {
    if(err) { return handleError(res, err); }
    if(!presentation) { return res.send(404); }
    presentation.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
