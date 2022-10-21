const express = require('express').Router();
const path = require("path");
const BlogData = require(path.join(__dirname, '../DataBase/Blog/blogData.js'));
const Uploads = require('../app')


//add blog data
express.post('/data', Uploads.array('image'), async (req, res) => {
    const { title, creater, content, categories, tags } = req.body
    const { path, originalname } = req.files[0]


    try {
        const Data = new BlogData(
            {
                title, creater, content, categories, tags,
                image: path,
                imageAlt: originalname
            }
        );
        await Data.save();

        res.send({ "status": "success", "message": "blog is added successfully" })
    }
    catch (e) {
        res.send({ "status": "failed", "message": "something went wrong" })
    }
})

//get the value from api
express.get('/data', async (req, res) => {

    try {
        const BlogGet = await BlogData.find({})
        res.send(BlogGet)
    }

    catch (e) {
        res.send(e)
    }

})


// getting blog by id and update the info
express.put('/data/:id', Uploads.array('image'), async (req, res) => {
    const { title, creater, content, categories, tags } = req.body
    const id = req.params.id;

    try {
        if (title || creater || content || categories || tags) {

            await BlogData.findByIdAndUpdate(id, {
                title: title,
                creater: creater,
                content: content,
                categories: categories,
                tags: tags
            })
            res.send({ status: "success", message: "Data updated successfully" })
        }
        else if (req.files && title || creater || content || categories || tags) {
            const { path, originalname } = req.files[0]
            await BlogData.findByIdAndUpdate(id, {
                title: title,
                creater: creater,
                content: content,
                categories: categories,
                tags: tags,
                image: path,
                imageAlt: originalname
            })
            res.send({ status: "success", message: "Data updated with Image successfully" })
        }
        else {
            const { path, originalname } = req.files[0]
            await BlogData.findByIdAndUpdate(id, {
                image: path,
                imageAlt: originalname
            })
            res.send({ status: "success", message: "Image are updated successfully" })
        }
        // if (comments) {
        //     await BlogData.findByIdAndUpdate(id,
        //         {
        //             $push: {
        //                 comments: comments
        //             }
        //         }
        //     )
        //     res.send({ status: "success", message: "comment Added successfully" })
        // }
    }

    catch (e) {
        res.send(e)
        console.log(e)
    }
})



//deleting the data by id
express.delete('/data/:id', async (req, res) => {
    try {
        const Id = req.params.id
        const Delete = await BlogData.findByIdAndDelete(Id, req.body);
        res.send(Delete);
    } catch (e) {
        res.send(e)
    }
})


//get the blog from there id.
express.get('/data/:id', async (req, res) => {

    try {
        const Id = req.params.id;
        const BlogGet = await BlogData.findById(Id, {})
        res.send(BlogGet)
    }

    catch (e) {
        res.send(e)
    }

})

module.exports = express;