const express = require('express').Router();
const path = require("path");
const RegisterData = require(path.join(__dirname, '../DataBase/Register/RegisterData'))
const bcrypt = require('bcrypt');
const dotenv = require("dotenv").config();

//adding user data at registration.
express.post('/data', async (req, res) => {
    // object distructaring
    const { name, email, password, conformpass } = req.body;

    // finding the email and username data from DB
    const emailMatch = await RegisterData.findOne({ email });

    if (emailMatch) {
        res.send({ "status": "failed", "message": "Email already exists" })
    }
    else {
        if (name && email && password && conformpass) {
            if (password === conformpass) {
                try {
                    // password hasing
                    const passwordHash = await bcrypt.hash(password, 10);
                    const Data = new RegisterData(
                        { name, email: email.toLowerCase(), password: passwordHash }
                    );

                    await Data.genrateToken()

                    await Data.save();
                    res.status(201).redirect(process.env.CLIENT_PORT).send({ "status": "success", "message": "Registration Success" });

                } catch (error) {
                    res.send({ "status": "failed", "message": "Unable to Register" });
                    console.log(error)
                }
            } else {
                res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" });
            }
        } else {
            res.send({ "status": "failed", "message": "All fields are required" });
        }
    }
}
)

express.put('/data/:id', async (req, res) => {
    const id = req.params.id;
    const Match = await RegisterData.findById(id)
    // object distructaring
    const { name, phone, email, username, password, oldpassword, conformpass, address, detail, checkin, admin } = req.body;

    if (Match) {
        //update password
        if (oldpassword && password && conformpass) {
            // checking if old password input and password on db match.
            const passMatch = await bcrypt.compare(oldpassword, Match.password);
            if (passMatch) {
                if (password === conformpass) {
                    //setting password of user
                    const passwordMatch = await bcrypt.compare(password, Match.password);
                    //checking if password from DB and new password match.
                    if (passwordMatch) {
                        res.send({ "status": "failed", "message": "Given Password and Your old password Are Same" });
                    } else {
                        try {
                            // password hasing
                            const passwordHash = await bcrypt.hash(password, 10);
                            await RegisterData.findByIdAndUpdate(id, { password:passwordHash });
                            res.send({ "status": "success", "message": "Your password is changed successfully" })
                        } catch (e) {
                            res.send({ "status": "failed", "message": "Unable to Update Password" });
                        }
                    }

                } else {
                    res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" });
                }
            }
            else {
                res.send({ "status": "failed", "message": "Given password not match with Old password" })
            }
        }
        else {
            try {
                // setting admin permition.
                if ((name || phone || email || username || address || detail || checkin)) {
                    await RegisterData.findByIdAndUpdate(id, { name, phone, email: email.toLowerCase(), address, detail });
                    res.send({ "status": "success", "message": "Your Data is Updated successfully" })
                }
            } catch (e) {
                res.send({ "status": "failed", "message": "Unable to Update Data" });
            }
        }
    }


})

module.exports = express;