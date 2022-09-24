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
    const Productimg = req.files.map((file) => { return file.path });
    const Productimgalt = req.files.map((file) => { return file.originalname });
    

    const Data = await ProductData.findByIdAndUpdate(id, {
        title: req.body.title,
        creater: req.body.creater,
        description: req.body.description,
        priceCost: req.body.priceCost,
        priceSell: req.body.priceSell,
        stock: req.body.stock,
        review: req.body.review,
        image: Productimg,
        imageAlt: Productimgalt
    });

    try {
        res.send(Data)
    }
    catch (e) {
        res.send(e)
    }
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

module.exports = express;