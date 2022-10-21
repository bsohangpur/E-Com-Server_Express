const express = require('express').Router();
const path = require("path");
// const UserCartData = require(path.join(__dirname, '../DataBase/Product/UserCartData'));
const RegisterData = require(path.join(__dirname, '../DataBase/Register/RegisterData'));

//Cart product add DB function
express.put('/data/add/:id', async (req, res) => {
    const id = req.params.id;
    const cartProduct = req.body.cartProduct;

    try {
        const User = await RegisterData.findById(id)
        if (User) {
            await RegisterData.updateOne(
                { _id: id }, { $push: { cartProduct } }
            )

            res.send({ "status": "success", "message": "cart product are added to user profile" })
        } else {
            res.send({ "status": "failed", "message": "No user Found" })
        }

    } catch (error) {
        console.log(error)
        res.send({ "status": "failed", "message": "Failed to load cart product", error })
    }
})

// //Cart product add to cookie function
// express.put('/data/add', async (req, res) => {
//     const cartProduct = req.body.cartProduct;
//     try {
//         res.cookie('cartjwt', cartProduct, {
//             secure: true,
//             httpOnly: true,
//             sameSite: 'lax'
//         });
//         res.send({ "status": "success", "message": "cart product are added to cookie" })

//     } catch (error) {
//         console.log(error)
//         res.send({ "status": "failed", "message": "Failed to load cart product", error })
//     }
// })


//Cart product remove function
express.put('/data/remove/:id', async (req, res) => {
    //user id
    const Id = req.params.id;
    //cart product id
    const id = req.body.id;

    try {
        const User = await RegisterData.findById({ _id: Id })
        if (User) {
            await RegisterData.updateOne(
                { _id: Id }, { $pull: { cartProduct: { _id: id } } }
            )

            res.send({ "status": "success", "message": "cart product are removed to user profile" })
        } else {
            res.send({ "status": "failed", "message": "User Not Found" })
        }

    } catch (error) {
        res.send({ "status": "failed", "message": "Failed to load cart product", error })
    }
})

//Cart product remove all function
express.put('/data/removeall/:id', async (req, res) => {
    //user id
    const _id = req.params.id;
    // //cart product id
    // const id = req.body.id;

    try {
        const User = await RegisterData.findById({ _id: Id })
        if (User) {
            await RegisterData.findByIdAndUpdate(_id, { cartProduct: "" }
            )

            res.send({ "status": "success", "message": "cart product are removed to user profile" })
        } else {
            res.send({ "status": "failed", "message": "User Not Found" })
        }

    } catch (error) {
        res.send({ "status": "failed", "message": "Failed to load cart product", error })
    }
})

//Get Cart product from DB.
express.get('/data/:id', async (req, res) => {
    //user id
    const Id = req.params.id;

    try {
        const User = await RegisterData.findById({ _id: Id })
        if (User) {
            let Amount = 0;
            for (let i = 0; i < User.cartProduct.length; i++) {
                Amount = User.cartProduct[i].priceSell * User.cartProduct[i].quantity + Amount
            }
            res.send({ "status": "success", "message": "cart product from DB", data: User.cartProduct, totalAmount: Amount })
        } else {
            res.send({ "status": "success", "message": "cart product from Cookie" })
        }

    } catch (error) {
        res.send({ "status": "failed", "message": "Failed to load cart product", error })
    }
})

//cart product quintaty update Edit function.
express.put('/data/edit/:id', async (req, res) => {
    const Id = req.params.id;

    try {
        const User = await RegisterData.findById({ _id: Id })
        if (User) {
            const { cartProduct, id } = req.body
            const index = User.cartProduct.findIndex(object => {
                return object._id == id
            });
            await RegisterData.updateOne(
                { _id: Id }, { $set: { ["cartProduct." + index]: cartProduct } }
            )

            res.send({ "status": "success", "message": "cart product quintaty update succesfly" })
        } else {
            res.send({ "status": "success", "message": "cart product from Cookie" })
        }

    } catch (error) {
        res.send({ "status": "failed", "message": "Failed to load cart product", error })
    }

})

// //Get Cart product from Cookies.
// express.get('/data', async (req, res) => {
//     try {
//         const data = req.cookies.cartjwt
//         res.send({ "status": "success", "message": "cart product from Cookie", data })

//     } catch (error) {
//         res.send({ "status": "failed", "message": "Failed to load cart product", error })
//     }
// })

module.exports = express;