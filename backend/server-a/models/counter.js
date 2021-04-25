const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CounterSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    seq: {
        type: Number,
        required: true
    }
});

function getNextSequence(name) {
    var ret = db.counters.findAndModify(
        {
            query: { _id: name },
            update: { $inc: { seq: 1 } },
            new: true,
            upsert: true // Creates a new document if no documents match the query
        }
    );

    return ret.seq;
}
module.exports.getNextSequence = getNextSequence;
// export with the name of "counter" so other JS files can read it
module.exports = Counter = mongoose.model('counter', CounterSchema);