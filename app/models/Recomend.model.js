const mongoose = require('mongoose');
const { Schema } = mongoose;

const recomendSchema = new Schema({
    userId: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    local: {
        type: String
    },
    public: {
        type: String
    },
    date: {
        type: String
    },
    hour: {
        type: String
    },
    minute: {
        type: String
    },
    group: {
        type: String
    }
})

module.exports = mongoose.model('recomend', recomendSchema);