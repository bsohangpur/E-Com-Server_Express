const express = require('express').Router();
const path = require("path");
const auth = require(path.join(__dirname, '../middleware/auth.js'))

express.get('/data', auth,  (req, res)=>{
    res.status(200).send({ "status": "success", "message": "login success", user: req.userData, admin:req.Admin })
})

module.exports = express;