const express = require('express').Router();
const path = require("path");
const BlogData = require(path.join(__dirname, '../DataBase/Blog/blogData.js'));
const Uploads = require('../app')


//add blog data
express.post('/data', Uploads.array('image'), async (req, res) => {

    const blogimg = req.files.map((file) => { return file.path });
    const blogimgalt = req.files.map((file) => { return file.originalname });

    const Data = new BlogData(
        {
            title: req.body.title,
            creater: req.body.creater,
            content: req.body.content,
            categories: req.body.categories,
            tags: req.body.tags,
            image: blogimg,
            imageAlt: blogimgalt
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

//adding blog comments data on same blog id.
// express.put("/data/:id", async (req, res) => {
//     const id = req.params.id;

//     try {

//     }
//     catch (e) {
//         res.send(e)
//     }
// })


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
    const id = req.params.id;
    try {
        if (req.body.title || req.body.creater || req.body.content || req.body.categories || req.body.tags) {

            await BlogData.findByIdAndUpdate(id, {
                title: req.body.title,
                creater: req.body.creater,
                content: req.body.content,
                categories: req.body.categories,
                tags: req.body.tags
            })
            res.send({ status: "success", message: "Data updated successfully" })
            console.log("1")
        }
        else if (req.files && req.body.title || req.body.creater || req.body.content || req.body.categories || req.body.tags) {
            const blogimg = req.files.map((file) => { return file.path });
            const blogimgalt = req.files.map((file) => { return file.originalname });
            const Data = await BlogData.findByIdAndUpdate(id, {
                title: req.body.title,
                creater: req.body.creater,
                content: req.body.content,
                categories: req.body.categories,
                tags: req.body.tags,
                image: blogimg,
                imageAlt: blogimgalt
            })
            res.send({ status: "success", message: "Data updated with Image successfully" })
            console.log("2")
        }
        if (req.body.comments) {
            const Data = await BlogData.findByIdAndUpdate(id,
                {
                    $push: {
                        comments: req.body.comments
                    }
                }
            )
            res.send({ status: "success", message: "comment Added successfully" })
            console.log("3")
        }
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