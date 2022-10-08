const express = require('express').Router();
const RegisterData = require(path.join(__dirname, '../DataBase/Register/RegisterData'))
const OrderData = require(path.join(__dirname, '../DataBase/Order/OrderData'))

express.post('/data', async (req, res) => {
    const { userId, productId, title, price, quntaty, total, address, orderNo, name, phone, email, comment } = req.body;

    try {
        const User = await RegisterData.findById({ _id: userId })
        if (User) {
            const Data = new OrderData({
                userId, productId, title, price, quntaty, total, address, orderNo,
            });
            await Data.save()
            res.send({ "status": "success", "message": "order data submited successfully with old user" })

        } else {
            const Data = new OrderData({
                productId, title, price, quntaty, total, name, email, phone, address, comment, orderNo,
            });
            await Data.save()
            res.send({ "status": "success", "message": "order data submited successfully with new user" })
        }

    } catch (e) {
        res.send({ "status": "failed", "message": "server error." })
        console.log(e)
    }

})

module.exports = express;