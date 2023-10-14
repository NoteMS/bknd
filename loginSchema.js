const mongoose = require('mongoose');
const validator = require('validator');


let loginSchema = new mongoose.Schema(
    {
        id: Number,
        password: String
    }
);

let uploadSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            require: true,
            unique: true
        },
        path: {
            type: String,
            require: true
        }
    }
);

const addUserSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            require: true,
        }
    }
);

const UpdateUserSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            require: true
        },
        name:
        {
            type: String,
            require: true
        },
        email:{
            type:String,
            validate(emailId){
                if(!validator.isEmail(emailId))
                {
                    throw new Error("Invalid Email");
                }
            },
            require:true
        }

    }
);

module.exports = {
    'StudentLogin': mongoose.model('studentregistration', loginSchema),
    'TeacherLogin':
        mongoose.model('teacherRegistration', loginSchema), 'UploadItem': mongoose.model('UploadItem', uploadSchema),
    'AddUserSchema': mongoose.model('studentids', addUserSchema),
    'UpdateUserSchema': mongoose.model('Studentregistration',UpdateUserSchema)
};