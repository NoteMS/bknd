const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const port = 2711;

const publicPath = path.join(__dirname, 'public');

// Serving files from the 'public' folder
app.use(express.static(publicPath));

const uploadFilePath = path.join(publicPath,'Files');

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

app.get('/display',(rep,res)=>{
    const data = {iframeUrl:'Files/bmp.pdf'} ;
    res.render(`${publicPath}/displayFile.ejs`,data);
});

app.get('/upload',(rep,res)=>{
    res.sendFile(`${publicPath}/upload.html`);
});

app.post('/upload1',upload,async(rep,res)=>{ 
    res.send('upload successfully');
});

app.listen(port);