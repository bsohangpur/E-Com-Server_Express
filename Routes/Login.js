const express = require('express').Router();
const path = require("path");
const RegisterData = require(path.join(__dirname, '../DataBase/Register/RegisterData'))
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

express.post('/data', async (req, res) => {
    const { email, password, conformpass } = req.body;

    const Email = email && email.toLowerCase()
    // finding the email and username data from DB
    const emailMatch = await RegisterData.findOne({ email:Email });
    if ((email) && password && conformpass) {
        if (emailMatch) {
            if (password === conformpass) {
                // checking if password input and password on db match.
                const passMatch = await bcrypt.compare(password, emailMatch.password);
                if (passMatch) {
                    const id = emailMatch._id
                    const admin = emailMatch.admin
                    const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY)
                    res.cookie('jwt', token, {
                        secure: true,
                        httpOnly: true,
                        sameSite: 'lax'
                    });
                    res.send({ "status": "success", "message": "Login Success", token, admin })
                } else {
                    res.send({ "status": "failed", "message": "Given password not match with Old password" })
                }
            } else {
                res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" });
            }
        } else {
            res.send({ "status": "failed", "message": "No Email or Username found" })
        }
    }
    else {
        res.send({ "status": "failed", "message": "All fields are required" });
    }

})

module.exports = express;
