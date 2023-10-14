const express = require('express');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const app = express();
const model = require('./schema');
const port = 2711;

const url = "mongodb://127.0.0.1:27017/MiniProject";
const connect = mongoose.connect(url);

app.use(express.urlencoded());
app.use(express.json());



const publicPath = path.join(__dirname, 'public');
 
// Serving files from the 'public' folder
app.use(express.static(publicPath));

let FILENAME;

const uploadFilePath = path.join(publicPath,'Files','Material');

let upload = multer({
    storage:multer.diskStorage({
        destination : function (req,file,cb){
            cb(null,uploadFilePath)
        },
        filename : function(req,file,cb){
            cb(null,file.originalname)
        }
    })
}).single("file");


app.get('/upload',(rep,res)=>{
    res.sendFile(`${publicPath}/upload.html`);
});

app.post('/upload1',upload,async(rep,res)=>{ 

    
    try{

        let saveFileInfo = new model[3]( { fileName : rep.file.filename , path : rep.file.path } );
        await saveFileInfo.save();

        res.send('upload successfully');

    }
    catch(err){
        res.send('Try 1 More Time ' + err);
    }
});


app.listen(port);