const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
  id: {
    type: Number,
    required: true
  },
  sandwichId: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['ordered', 'received', 'inQueue', 'ready', 'failed'],
    default: 'failed'
  },
  date: {
    type: Date,
    default: Date.now
  }
});
// export with the name of "order" so other JS files can read it
module.exports = Order = mongoose.model('order', ItemSchema);