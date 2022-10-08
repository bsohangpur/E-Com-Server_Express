const mongodb = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();


const RegisterSchema = new mongodb.Schema({
    name: {
        firstName: { type: String },
        lastName: { type: String }
    },
    phone: { type: Number, min: 1111111111, max: 9999999999 },
    email: { type: String, minLength: 5 },
    username: { type: String },
    password: { type: String },
    detail: { type: String },
    address: {
        streetAddress: { type: String },
        apartment: { type: String },
        country: { type: String },
        state: { type: String },
        zipCode: { type: Number, min: 111111, max: 999999 }
    },
    checkin: { type: Boolean },
    token: { type: String },
    admin: {
        admin: { type: Boolean, default: false },
        type: { type: Number, default: 1996 }
    },
    cartProduct: [{
        title: {
            type: String,
            required: true
        },
        priceSell: {
            type: Number,
            required: true
        },
        quantity: {
            type: String,
            required: true,
            default: 1
        },
        productId: { type: String },
        image: { type: String },
        imageAlt: { type: String },
        createdOn: { type: Date, default: Date.now }
    }]
})

RegisterSchema.methods.genrateToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
        this.token = token;
        await this.save()
    } catch (error) {
        console.log(error)
    }
}


module.exports = new mongodb.model('Registerdata', RegisterSchema)