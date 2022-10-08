const express = require('express').Router();

express.get('/data', (req, res)=>{
    res.clearCookie('jwt', {path: '/'});
    res.status(200).send({ "status": "success", "message": "Logout successfully" })
})

module.exports = express;