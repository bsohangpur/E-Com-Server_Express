const express = require('express').Router();
const path = require("path");
const RegisterData = require(path.join(__dirname, '../DataBase/Register/RegisterData'))
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

express.post('/data', async (req, res) => {
    const { username, email, password, conformpass } = req.body;

    // finding the email and username data from DB
    const emailMatch = await RegisterData.findOne({ email });
    const usernameMatch = await RegisterData.findOne({ username });
    if ((email || username) && password && conformpass) {
        if (emailMatch || usernameMatch) {
            if (password === conformpass) {
                // checking if password input and password on db match.
                const passMatch = await bcrypt.compare(password, email ? emailMatch.password : usernameMatch.password);
                if (passMatch) {
                    const id = email ? emailMatch._id : usernameMatch._id
                    const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY)
                    res.cookie('jwt', token);
                    res.send({ "status": "success", "message": "Login Success", token })
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
