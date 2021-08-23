const mongoose = require('mongoose');
const { Schema } = mongoose;

const configSchema = new Schema({
    lastUpdate: {
        type: {
            day: {
                type: String
            },
            month: {
                type: String
            },
            year: {
                type: String
            }
        }
    }
})

module.exports = mongoose.model('config', configSchema);