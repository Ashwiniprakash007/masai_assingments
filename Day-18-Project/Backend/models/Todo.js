const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  dueDate: Date,
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
});
module.exports = mongoose.model('Todo', todoSchema);