const express = require('express')
const app = express.Router();
const path = require("path");

//routes to home 
app.get('/', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../clients', 'build')))
    res.sendFile(path.resolve(__dirname, '../clients', 'build', 'index.html'))
})
//routes to about page
app.get('/about', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../clients', 'build')))
    res.sendFile(path.resolve(__dirname, '../clients', 'build', 'index.html'))
})
//routes to shop page
app.get('/shop', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../clients', 'build')))
    res.sendFile(path.resolve(__dirname, '../clients', 'build', 'index.html'))
})
//routes to blog page
app.get('/blog', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../clients', 'build')))
    res.sendFile(path.resolve(__dirname, '../clients', 'build', 'index.html'))
})
//routes to contact page
app.get('/contact', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../clients', 'build')))
    res.sendFile(path.resolve(__dirname, '../clients', 'build', 'index.html'))
})
//routes to cart page
app.get('/cart', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../clients', 'build')))
    res.sendFile(path.resolve(__dirname, '../clients', 'build', 'index.html'))
})
//routes to profile page
app.get('/profile', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../clients', 'build')))
    res.sendFile(path.resolve(__dirname, '../clients', 'build', 'index.html'))
})
//routes to login page
app.get('/login', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../clients', 'build')))
    res.sendFile(path.resolve(__dirname, '../clients', 'build', 'index.html'))
})
//routes to register page
app.get('/register', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../clients', 'build')))
    res.sendFile(path.resolve(__dirname, '../clients', 'build', 'index.html'))
})
//routes to admin page
app.get('/admin', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../clients', 'build')))
    res.sendFile(path.resolve(__dirname, '../clients', 'build', 'index.html'))
})
//routes to admin product page
app.get('/admin/product', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../clients', 'build')))
    res.sendFile(path.resolve(__dirname, '../clients', 'build', 'index.html'))
})
//routes to admin add product page
app.get('/admin/addproduct', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../clients', 'build')))
    res.sendFile(path.resolve(__dirname, '../clients', 'build', 'index.html'))
})
//routes to admin main product edit page
app.get('/admin/mainproductedit', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../clients', 'build')))
    res.sendFile(path.resolve(__dirname, '../clients', 'build', 'index.html'))
})
//routes to admin blog page
app.get('/admin/blog', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../clients', 'build')))
    res.sendFile(path.resolve(__dirname, '../clients', 'build', 'index.html'))
})
//routes to admin add blog page
app.get('/admin/addblog', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../clients', 'build')))
    res.sendFile(path.resolve(__dirname, '../clients', 'build', 'index.html'))
})
//routes to admin main blog edit page
app.get('/admin/mainblogedit', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../clients', 'build')))
    res.sendFile(path.resolve(__dirname, '../clients', 'build', 'index.html'))
})
//routes to admin complain page
app.get('/admin/complain', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../clients', 'build')))
    res.sendFile(path.resolve(__dirname, '../clients', 'build', 'index.html'))
})
//routes to admin profile page
app.get('/admin/profile', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../clients', 'build')))
    res.sendFile(path.resolve(__dirname, '../clients', 'build', 'index.html'))
})

module.exports = app;