var mongoose = require('mongoose');

var AboutUsSchema = new mongoose.Schema({
  title: { type: String, default: 'aboutUs' },
  content: { type: String },
  createAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('AboutUs', AboutUsSchema);
