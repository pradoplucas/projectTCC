const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
    eventId: {
        type: String
    },
    eventName: {
        type: String
    },
    year: {
        type: Number
    },
    certificates: {
        type: [{
            code: {
                type: String
            },
            owner: {
                type: String
            }
        }]
    }
})

module.exports = mongoose.model('event', eventSchema);