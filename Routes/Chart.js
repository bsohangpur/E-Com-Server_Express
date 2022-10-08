const express = require('express').Router();
const path = require("path");
// const UserChartData = require(path.join(__dirname, '../DataBase/Product/UserChartData'));
const RegisterData = require(path.join(__dirname, '../DataBase/Register/RegisterData'));

//Chart product add DB function
express.put('/data/add/:id', async (req, res) => {
    const id = req.params.id;
    const cartProduct = req.body.cartProduct;

    try {
        const User = await RegisterData.findById(id)
        if (User) {
            await RegisterData.updateOne(
                { _id: id }, { $push: { cartProduct } }
            )

            res.send({ "status": "success", "message": "chart product are added to user profile" })
        } else {
            res.send({ "status": "failed", "message": "No user Found" })
        }

    } catch (error) {
        console.log(error)
        res.send({ "status": "failed", "message": "Failed to load chart product", error })
    }
})

// //Chart product add to cookie function
// express.put('/data/add', async (req, res) => {
//     const cartProduct = req.body.cartProduct;
//     try {
//         res.cookie('chartjwt', cartProduct, {
//             secure: true,
//             httpOnly: true,
//             sameSite: 'lax'
//         });
//         res.send({ "status": "success", "message": "chart product are added to cookie" })

//     } catch (error) {
//         console.log(error)
//         res.send({ "status": "failed", "message": "Failed to load chart product", error })
//     }
// })


//Chart product remove function
express.put('/data/remove/:id', async (req, res) => {
    //user id
    const Id = req.params.id;
    //chart product id
    const id = req.body.id;

    try {
        const User = await RegisterData.findById({ _id: Id })
        if (User) {
            await RegisterData.updateOne(
                { _id: Id }, { $pull: { cartProduct: { _id: id } } }
            )

            res.send({ "status": "success", "message": "chart product are removed to user profile" })
        } else {
            res.send({ "status": "failed", "message": "User Not Found" })
        }

    } catch (error) {
        res.send({ "status": "failed", "message": "Failed to load chart product", error })
    }
})

//Get Chart product from DB.
express.get('/data/:id', async (req, res) => {
    //user id
    const Id = req.params.id;

    try {
        const User = await RegisterData.findById({ _id: Id })
        if (User) {
            let Amount=0;
            for(let i= 0; i< User.cartProduct.length; i++ ){
                 Amount = User.cartProduct[i].priceSell + Amount
            }
            res.send({ "status": "success", "message": "chart product from DB", data: User.cartProduct, totalAmount : Amount })
        } else {
            const data = req.cookies.chartjwt
            console.log(data)
            res.send({ "status": "success", "message": "chart product from Cookie" })
        }

    } catch (error) {
        res.send({ "status": "failed", "message": "Failed to load chart product", error })
    }
})

// //Get Chart product from Cookies.
// express.get('/data', async (req, res) => {
//     try {
//         const data = req.cookies.chartjwt
//         res.send({ "status": "success", "message": "chart product from Cookie", data })

//     } catch (error) {
//         res.send({ "status": "failed", "message": "Failed to load chart product", error })
//     }
// })

module.exports = express;