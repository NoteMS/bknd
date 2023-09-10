const mongoose = require('mongoose');
const validator = require('validator');

// Student Registration Schema
let studentRegistration = new mongoose.Schema(
    {
        id:{
            type:Number,
            require:true,
            unique:true
        },
        email:{
            type:String,
            validate(emailId){
                if(!validator.isEmail(emailId))
                {
                    throw new Error("Invalid Email");
                }
            },
            unique:true,
            require:true
        },
        name:
        {
            type:String,
            lowercase:true,
            require:true
        },
        password:
        {
            type:String,
            require:true
        },
        year:{
            type:String,
            require:true
        }
    },
    {
        versionKey:false
    }
);


// Teacher Registration Schema
let teacherRegistration = new mongoose.Schema(
    {
        id:{
            type:Number,
            require:true,
            unique:true
        },
        email:{
            type:String,
            validate(emailId){
                if(!validator.isEmail(emailId))
                {
                    throw new Error("Invalid Email");
                }
            },
            unique:true,
            require:true
        },
        name:
        {
            type:String,
            lowercase:true,
            require:true
        },
        password:
        {
            type:String,
            require:true
        }
    },
    {
        versionKey:false
    }
);


// First two model are for registration
// And others are for login
module.exports = [mongoose.model('studentregistrations',studentRegistration),
            mongoose.model('teacherRegistrations',teacherRegistration)];