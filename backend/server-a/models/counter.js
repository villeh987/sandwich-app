const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
