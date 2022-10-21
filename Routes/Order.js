const express = require('express').Router();
const path = require("path");
const RegisterData = require(path.join(__dirname, '../DataBase/Register/RegisterData'))
const OrderData = require(path.join(__dirname, '../DataBase/Order/OrderData'))

express.post('/data', async (req, res) => {
    const { userId, product, total, address, orderNo, name, phone, email, comment } = req.body;

    try {
        const User = userId && await RegisterData.findById({ _id: userId })
        if (User) {
            const Data = new OrderData({
                userId, product, total, address, orderNo, name, phone, email, comment
            });
            await Data.save()
            res.send({ "status": "success", "message": "order data submited successfully with old user" })

        } else {
            const Data = new OrderData({
                userId, product, total, address, orderNo, name, phone, email, comment
            });
            await Data.save()
            res.send({ "status": "success", "message": "order data submited successfully with new user" })
        }

    } catch (e) {
        res.send({ "status": "failed", "message": "server error." })
        console.log(e)
    }

})

//get the value from api
express.get('/data', async (req, res) => {

    try {
        const ComplainGet = await OrderData.find({})
        res.send(ComplainGet)
    }

    catch (e) {
        res.send({ "status": "failed", "message": "Some thing went wrong" })
    }

})


module.exports = express;