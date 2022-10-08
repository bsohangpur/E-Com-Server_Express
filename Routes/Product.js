const express = require('express').Router();
const path = require("path");
const ProductData = require(path.join(__dirname, '../DataBase/Product/ProductData'));
const Uploads = require('../app')



//add Product data
express.post('/data', Uploads.array('image'), async (req, res) => {

    const Productimg = req.files.map((file) => { return file.path });
    const Productimgalt = req.files.map((file) => { return file.originalname });


    const Data = new ProductData(
        {
            title: req.body.title,
            creater: req.body.creater,
            description: req.body.description,
            priceCost: req.body.priceCost,
            priceSell: req.body.priceSell,
            stock: req.body.stock,
            review: req.body.review,
            image: Productimg,
            imageAlt: Productimgalt,
            category: req.body.category,
            color: req.body.color,
            size: req.body.size,
        }
    );
    const Send = await Data.save();

    try {
        res.send(Send)
    }
    catch (e) {
        res.send(e)
    }
})

//get the value from api
express.get('/data', async (req, res) => {

    try {
        const ProductGet = await ProductData.find({})
        res.send(ProductGet)
    }

    catch (e) {
        res.send(e)
    }

})

// getting product by id and update the info
express.put('/data/:id', Uploads.array('image'), async (req, res) => {
    const id = req.params.id;
    // destructure product data
    const { title, creater, description, priceCost, priceSell, stock, review, category, color, size } = req.body;
    try {
        if (title || creater || description || priceCost || priceSell || stock || category || color || size) {

            await ProductData.findByIdAndUpdate(id, {
                title,
                creater,
                description,
                priceCost,
                priceSell,
                stock,
                category,
                color,
                size
            })
            res.send({ status: "success", message: "Data updated successfully" })
        }
        else if (req.files && title || creater || description || priceCost || priceSell || stock || category || color || size) {
            const productImg = req.files.map((file) => { return file.path });
            const productImgalt = req.files.map((file) => { return file.originalname });
            await ProductData.findByIdAndUpdate(id, {
                title,
                creater,
                description,
                priceCost,
                priceSell,
                stock,
                review,
                category,
                color,
                size,
                image: productImg,
                imageAlt: productImgalt
            })
            res.send({ status: "success", message: "Data updated with Image successfully" })
        }
        // if (review) {
        //     await ProductData.findByIdAndUpdate(id,
        //         {
        //             $push: {
        //                 review
        //             }
        //         }
        //     )
        //     res.send({ status: "success", message: "review Added successfully" })
        // }
    }

    catch (e) {
        res.send(e)
        console.log(e)
    }

    // const id = req.params.id;
    // const Productimg = req.files.map((file) => { return file.path });
    // const Productimgalt = req.files.map((file) => { return file.originalname });


    // const Data = await ProductData.findByIdAndUpdate(id, {
    //     title: req.body.title,
    //     creater: req.body.creater,
    //     description: req.body.description,
    //     priceCost: req.body.priceCost,
    //     priceSell: req.body.priceSell,
    //     stock: req.body.stock,
    //     review: req.body.review,
    //     image: Productimg,
    //     imageAlt: Productimgalt
    // });

    // try {
    //     res.send(Data)
    // }
    // catch (e) {
    //     res.send(e)
    // }
})

//deleting the data by id
express.delete('/data/:id', async (req, res) => {
    try {
        const Id = req.params.id
        const Delete = await ProductData.findByIdAndDelete(Id, req.body);
        res.send(Delete);
    } catch (e) {
        res.send(e)
    }
})

//CURD opration on reviews

//Review Adding function
express.put('/data/review/add/:id', async (req, res) => {
    const Id = req.params.id;
    const review = req.body.review;
    try {
        await ProductData.updateOne(

            { _id: Id }, { $push: { review } }
        )
        res.send("success")

    } catch (e) {
        console.log(e)
        res.send("failed")
    }
})

//Review delete function
express.put('/data/review/delete/:id', async (req, res) => {
    const Id = req.params.id;
    const id = req.body.id;
    try {
        await ProductData.updateOne(

            { _id: Id }, { $pull: { review: { _id: id } } }
        )
        res.send("success")

    } catch (e) {
        console.log(e)
        res.send("failed")
    }
})

//Review Edit function.
express.put('/data/review/edit/:id', async (req, res) => {
    const Id = req.params.id;
    const { review, id } = req.body;
    const product = await ProductData.findById(Id);
    const index = product.review.findIndex(object => {
        return object._id == id;
      });
    try {
        await ProductData.updateOne(
            { _id: Id}, { $set: { ["review."+index]:review } }
        )
        res.send("success")

    } catch (e) {
        console.log(e)
        res.send("failed")
    }
})


module.exports = express;