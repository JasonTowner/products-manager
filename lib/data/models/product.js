"use-strict";

var Mongoose = require('mongoose'),
  Schema = Mongoose.Schema;

var ProductSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  price: { type: Number, min: 0, precision: 2, required: true }
});

module.exports = Mongoose.model('Product', ProductSchema);