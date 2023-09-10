const mongoose = require('mongoose');
const validator = require('validator');


let loginSchema = new mongoose.Schema(
    {
        id:Number,
        password:String
    }
);

module.exports = [mongoose.model('studentregistrations',loginSchema),
mongoose.model('teacherRegistrations',loginSchema)];