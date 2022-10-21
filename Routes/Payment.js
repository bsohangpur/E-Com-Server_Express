const express = require('express').Router();
const dotenv = require("dotenv").config();
const crypto = require('crypto');
const path = require("path");
const RegisterData = require(path.join(__dirname, '../DataBase/Register/RegisterData'))
const OrderData = require(path.join(__dirname, '../DataBase/Order/OrderData'))

//Payment Gateway Razorpay
const Razorpay = require('razorpay')
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_KEY,
});

//set order detail at razerpay.
express.post('/order', async (req, res) => {
    try {
        const options = {
            amount: (Number(req.body.total) * 100),
            currency: "INR"
        };
        const order = await instance.orders.create(options)
        res.send(order)
    }
    catch (e) {
        console.log(e)
    }

})

//verifiy payment on rayzerpay.
express.post('/verification', async (req, res) => {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.response
    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const crypto = require("crypto");
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY)
        .update(body.toString())
        .digest('hex');

    if (razorpay_signature === expectedSignature) {
        const { userId, product, total, address, name, phone, email, comment } = req.body.data


        try {
            if (userId) {
                const User = userId && await RegisterData.findById({ _id: userId })
                if (User) {
                    const Data = new OrderData({
                        userId, product, total, address, orderId:razorpay_order_id, name, phone, email, comment
                    });
                    await Data.save()
                    res.send({ "status": "success" })

                }
            } else {
                const Data = new OrderData({
                    userId, product, total, address, orderId:razorpay_order_id, name, phone, email, comment
                });
                await Data.save()
                res.send({ "status": "success" })
            }

        } catch (e) {
            res.send({ "status": "failed", "message": "server error." })
            console.log(e)
        }

    }
    else {
        res.status(400).send({ "status": "failed" })
    }
})

// //send key to front-end
// express.get('/order/conform', async (req, res) => {
//     res.send({"status":"success"})
// })

//send key to front-end
express.get('/order/key', async (req, res) => {
    res.send(process.env.RAZORPAY_ID)
})

module.exports = express;