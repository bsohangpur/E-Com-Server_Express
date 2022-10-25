const express = require('express').Router();
const path = require("path");
const ProductData = require(path.join(__dirname, '../DataBase/Product/ProductData'));

express.post('/product', async (req, res) => {
    const { query } = req.body

    try {
        const title = {
            title: {
                $regex: query,
                $options: "i"
            }
        }
        if (query) {
            const Search = await ProductData.find({ ...title })
            res.send({ status: "success", message: "search result...", data: Search })
        }
        else {
            res.send({ status: "failed", message: "enter any query to search" })
        }

    } catch (e) {
        res.send({ status: "failed", message: "server error" })
    }

})

module.exports = express;