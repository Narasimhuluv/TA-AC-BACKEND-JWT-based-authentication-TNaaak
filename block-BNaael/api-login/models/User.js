var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
require('dotenv').config();

var userSchema = new Schema({
    name : {type : String},
    email : {type : String, unique : true},
    password : {type : String, required : true},
},{timestamps: true})


// register 
userSchema.pre('save', async function(next){
    if(this.password && this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})
// login 
userSchema.methods.verifyPassword = async function(password){
    try {
        var result = await bcrypt.compare(password, this.password)
        return result
    } catch (error) {
        return error;
    }
}

// token
userSchema.methods.signToken = async function(){
    console.log(this)
    var payload = {userId : this.id, email : this.email};
    try {
        // var token = await jwt.sign(payload,"thisisasecret")
        var token = await jwt.sign(payload,process.env.SECRET)
        return token
    } catch (error) {
        return error
    }
}

userSchema.methods.userJSON = function(token){
    return{
        name : this.name,
        email : this.email,
        token : token
    }

}

var User = mongoose.model('User', userSchema)
module.exports = User;

