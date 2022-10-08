const mongodb = require('mongoose');

const ComplainSchema = new mongodb.Schema({
    name: {
        firstName: { type: String },
        lastName: { type: String }
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: [{ 
        status:{type: Number, default: 0},
        state :{type: String, default: 'pending'},
        time:{type: Date, default: Date.now}
     }],
    createdOn: { type: Date, default: Date.now }
})

module.exports = new mongodb.model('ComplainData', ComplainSchema);