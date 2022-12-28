// const { default: mongoose } = require("mongoose")
const mongoose = require("mongoose")
const database = process.env.DATABASE
mongoose.set('strictQuery', false);
mongoose.connect(database,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //     // useCreateIndex: true,
    //     // useFindAndModify: false
}).then(console.log("connected Succesfully"))
.catch((err)=>console.log("this is a error"+ err))
