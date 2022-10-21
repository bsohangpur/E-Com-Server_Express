// import all stufs
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv").config();

//connect Database
const Database = require('./DataBase/connection')

// import multer for image file
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, './uploads');
    },
    filename: (req, file, cd) => {
        cd(null, file.originalname);
    }
})

const upload = multer({ storage })
module.exports = upload;

// define port
const port = process.env.PORT

// define static path
const staticpath = path.join(__dirname, "../public");


// middleware
app.use(express.json());
app.use(express.static(staticpath));
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));

const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use('/uploads', express.static('./uploads'));



//Blog Routes
const Blog = require('./Routes/Blog');
app.use('/blog', Blog);


//Product Routes
const Product = require('./Routes/Product');
app.use('/product', Product);

//Registeration Routes
const Register = require('./Routes/Register');
app.use('/register', Register);

//Login Routes
const Login = require('./Routes/Login');
app.use('/login', Login);

//Login Routes
const User = require('./Routes/User');
app.use('/user', User);

//Logout Routes
const Logout = require('./Routes/Logout');
app.use('/logout', Logout);

//Complain Routes
const Complain = require('./Routes/Complain');
app.use('/complain', Complain);

//User Chart data Routes
const Chart = require('./Routes/Chart');
app.use('/chart', Chart);

//User Chart data Routes
const Order = require('./Routes/Order');
app.use('/order', Order);

//Routes to react webSite with Api
const Routes = require('./Routes/Routes');
app.use('/', Routes);

//User Payment data Routes
const Payment = require('./Routes/Payment');
app.use('/payment', Payment);



app.listen(port, console.log("live"))
