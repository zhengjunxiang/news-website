var mongoose = require('mongoose');

var ThingsSchema = new mongoose.Schema({
  title: { type: String },
  createAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Things', ThingsSchema);
