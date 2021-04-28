const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// the Counter model keeps track of the newest order ID. 
// On every new order the counter value is increased by 1 and the value is fetched and stored in the order data
// Basically the counter value is equivalent for the newest order ID and
// The _id value is the name of the ID that is being tracked, so it is possible to keep track of multiple different ID's
// for example one counter for the orders and one for the toppings (if implemented)
const CounterSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    counter: {
        type: Number,
        default: 0
    }
});
// export with the name of "counter" so other JS files can read it
module.exports = Counter = mongoose.model('counter', CounterSchema);
