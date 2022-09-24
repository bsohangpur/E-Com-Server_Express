const mongodb = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();


const RegisterSchema = new mongodb.Schema({
    name: {
        firstName: { type: String },
        lastName: { type: String }
    },
    phone: { type: Number, min: 10 },
    email: { type: String, minLength: 5 },
    username: { type: String },
    password: { type: String },
    detail: { type: String },
    address: {
        streetAddress: { type: String },
        apartment: { type: String },
        country: { type: String },
        state: { type: String },
        zipCode: { type: Number, min: 6, max: 6 }
    },
    comment: { type: String },
    checkin: { type: Boolean },
    token: { type: String },
    admin: { type: Boolean }
})

RegisterSchema.methods.genrateToken = async function(){
    try{
        const token = jwt.sign({_id:this._id} , process.env.JWT_SECRET_KEY);
        this.token=token;
        await this.save()
    }catch(error){
        console.log(error)
    }
}


module.exports = new mongodb.model('Registerdata', RegisterSchema)