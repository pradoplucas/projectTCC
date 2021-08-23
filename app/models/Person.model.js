const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = new Schema({
    name: {
        type: String
    },
    certificates: {
        type: [{
            code: {
                type: String
            },
            year: {
                type: String
            },
            eventId: {
                type: String
            },
            eventName: {
                type: String
            },
            table: {
                type: String
            }
        }]
    }
})

module.exports = mongoose.model('owner', personSchema);
