const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    password:String,
    tokens:String,
    date:{type:Date,default:Date.now}

})

userSchema.methods.generateAuthToken = async function(){
    try{
        
        let token = jwt.sign({_id:this._id} , process.env.SECRET_KEY); // jwt.sign is used to generate token
        // this.tokens = this.tokens.concat({token:token}) 
        this.tokens = token
        await this.save();  // this will save the token to the database 
        return token;
    }catch (err){ 
        console.log(err);
    }
}

const userList = new mongoose.model("userSchema",userSchema);
module.exports = userList;