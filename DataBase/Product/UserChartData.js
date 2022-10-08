const Mongoose = require('mongoose');

const UserChartSchema = Mongoose.Schema()

module.exports = Mongoose.model('UserCartData', UserChartSchema)