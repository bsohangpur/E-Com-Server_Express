const express = require('express').Router();
const path = require("path");
const RegisterData = require(path.join(__dirname, '../DataBase/Register/RegisterData'))
const bcrypt = require('bcrypt');


//adding user data at registration.
express.post('/data', async (req, res) => {
    // object distructaring
    const { name, phone, email, username, password, conformpass, detail, address, checkin } = req.body;

    // finding the email and username data from DB
    const emailMatch = await RegisterData.findOne({ email });
    const usernameMatch = await RegisterData.findOne({ username });

    if (emailMatch) {
        res.send({ "status": "failed", "message": "Email already exists" })
    }
    else if (usernameMatch) {
        res.send({ "status": "failed", "message": "Username already exists" })
    }
    else {
        if (name && phone && (email || username) && password && conformpass) {
            if (password === conformpass) {
                try {
                    // password hasing
                    const passwordHash = await bcrypt.hash(password, 10);
                    const Data = new RegisterData(
                        { name, phone, email, username, password: passwordHash, detail, address, checkin }
                    );

                    await Data.genrateToken()

                    await Data.save();
                    res.status(201).send({ "status": "success", "message": "Registration Success" });

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


    //update password
    if (oldpassword && password && conformpass) {
        // checking if old password input and password on db match.
        const passMatch = await bcrypt.compare(oldpassword, Match.password);
        if (passMatch) {
            if (password === conformpass) {
                const passwordMatch = await bcrypt.compare(password, Match.password);
                //checking if password from DB and new password match.
                if (passwordMatch) {
                    res.send({ "status": "failed", "message": "Given Password and Your old password Are Same" });
                } else {
                    try {
                        // password hasing
                        const passwordHash = await bcrypt.hash(password, 10);
                        const Data = await RegisterData.findByIdAndUpdate(id, { passwordHash });
                        Data.save();
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
            if (admin) {
                await RegisterData.findByIdAndUpdate(id, { admin })
                res.send({ "status": "success", "message": "Your are successfully added as Admin." })
            }
            else {
                await RegisterData.findByIdAndUpdate(id, { name, phone, email, username, address, detail, checkin });
                res.send({ "status": "success", "message": "Your Data is Updated successfully" })
            }
        } catch (e) {
            res.send({ "status": "failed", "message": "Unable to Update Data" });
        }
    }


})

module.exports = express;