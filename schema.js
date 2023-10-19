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

// Student ID Validator Schema
let studentID = new mongoose.Schema(
    {
        id:{
            type:Number,
            require:true,
            unique:true
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

const materialPath = new mongoose.Schema(
    {
        fileName : {
            type : String,
            unique : true,
            require:true
        },
        path : {
            type : String,
            require:true
        }
    },
    {
        versionKey:false
    }
);


// 1. First model is for student registration
// 2. Second model is for teacher registration
// 3. Third model is for validation student id (It is Of MSU University Or Not)
// 4. Fourth model is for storing filename and path of file
module.exports = [mongoose.model('studentregistrations',studentRegistration),
                  mongoose.model('teacherRegistrations',teacherRegistration),
                  mongoose.model('studentId',studentID),
                  mongoose.model('MaterialPath',materialPath)];