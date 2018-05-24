var mongoose = require('mongoose');

var ThingsSchema = new mongoose.Schema({
  title: { unique: true, type: String },
  creater: { type: String, default: 'Noname' },
  createAt: { type: Number, default: Date.now }
});

module.exports = mongoose.model('Things', ThingsSchema);
