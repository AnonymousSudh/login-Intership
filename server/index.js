const express = require("express");
var bodyParser = require('body-parser')
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userSchema = require("./model/userSchema");

require('dotenv').config({ path: './config.env' })
require("./connection/connection")

app.use(cookieParser())
app.use(bodyParser.json())

const PORT = process.env.PORT||5000;

app.post('/sendUserData', async (req, res) => {

    const { email, password } = req.body
    console.log(email);
    const userExist = await userSchema.findOne({ email })
    console.log(userExist);
    if (!userExist) {
        const data = await userSchema({ email, password }).save();
        console.log(data);
        const token = await data.generateAuthToken();
        if (data) {
            res.cookie("intership", token, { expires: new Date(Date.now() + 10000) })
            res.cookie("userid", data._id)
            res.sendStatus(200)
        }
    }



})
app.post('/getToken', async (req, res) => {
    const { token } = req.body
    console.log(token);
    if (!token) {
        res.status(404).send()
    }
    const userDetails = await userSchema.find({ tokens: token })
    console.log("token after refresh");
    console.log(userDetails);
    if (userDetails) {
        res.status(200).send(userDetails)
    }

})


 

if ( process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));

    const path = require("path");

    app.get("*", (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

    })


}

app.listen(PORT, () => {
    console.log(`listning to port no ${PORT}`);
})