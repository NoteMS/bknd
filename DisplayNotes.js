const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const port = 2711;

const publicPath = path.join(__dirname, 'public');

// Serving files from the 'public' folder
app.use(express.static(publicPath));


app.get('/display',(rep,res)=>{
    const data = {iframeUrl:'Files/bmp.pdf'} ;
    res.render(`${publicPath}/displayFile.ejs`,data);
});


app.listen(port);