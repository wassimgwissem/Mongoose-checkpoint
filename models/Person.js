const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  age: {
    type: Number,
    min: 0,
    max: 120
  },
  favoriteFoods: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Person', personSchema);