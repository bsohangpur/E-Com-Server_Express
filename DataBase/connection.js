const DBConnection = process.env.MONGODBATLES;
const mongodb = require("mongoose");

mongodb.connect(DBConnection, {
    useNewUrlParser: true
}).then(() => {
    console.log("connected to DB sucsessfull")
}).catch((e) => {
    console.log(`not connected ${e}`)
})

