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
app.get('/admin/*', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../clients', 'build')))
    res.sendFile(path.resolve(__dirname, '../clients', 'build', 'index.html'))
})

//routes to product detail pages.
app.get('/product/*', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../clients', 'build')))
    res.sendFile(path.resolve(__dirname, '../clients', 'build', 'index.html'))
})

//routes to blog detail pages.
app.get('/blog/*', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../clients', 'build')))
    res.sendFile(path.resolve(__dirname, '../clients', 'build', 'index.html'))
})


module.exports = app;