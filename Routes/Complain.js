const express = require('express').Router();
const path = require("path");
const ComplainData = require(path.join(__dirname, '../DataBase/Complain/ComplainData'));



//add blog data
express.post('/data', async (req, res) => {

    const Data = new ComplainData(
        {
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message
        }
    );
    await Data.save();

    try {
        res.send({ "status": "success", "message": "Your data is send successfully" })
    }
    catch (e) {
        res.send({ "status": "failed", "message": "Some thing went wrong" })
    }
})

//get the value from api
express.get('/data', async (req, res) => {

    try {
        const BlogGet = await ComplainData.find({})
        res.send(BlogGet)
    }

    catch (e) {
        res.send({ "status": "failed", "message": "Some thing went wrong" })
    }

})



module.exports = express;