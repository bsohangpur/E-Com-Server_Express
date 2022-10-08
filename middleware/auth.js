const jwt = require('jsonwebtoken');
const path = require("path");
const UserData = require(path.join(__dirname, '../DataBase/Register/RegisterData'));
const dotenv = require("dotenv").config();

const Auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (token) {
            const userData = await UserData.findOne({ _id: verify.id });
            req.token = token;
            const Data = {
                id:userData._id,
                name: userData.name,
                address: userData.address,
                phone: userData.phone,
                email: userData.email,
                username: userData.username,
                detail: userData.detail
            }
            req.Admin = userData.admin
            req.userData = Data;
            next();
        }
        else{
            res.send({ "status": "failed", "message": "User Not Found" })
        }

    } catch (e) {
        res.status(401).send({ "status": "failed", "message": "Unable to Load Page" })
    }
}

module.exports = Auth