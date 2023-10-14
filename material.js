const fs = require('fs');
const path = require('path');
const express = require('express');
const { url } = require('inspector');
const app = express();

let dir = path.join(__dirname, 'public','Files','Material');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public','Files','Material','PDFViewer.ejs')));

var fileList = [];

app.get('/fileList', (req, res) => {
    let a = [];
    fs.readdir(dir, (err, file) => {
        file.forEach((item) => {
            if(item != 'PDFViewer.ejs')
            {
                a.push(item);
            }
        })
        if(a.length == 0)
        {
            a = ["Empty"];
        }
        res.render(__dirname + "/public/render.ejs", { a });
    });
});

app.get('/openFile', (rep, res) => {
    const data = {
        fileName: rep.query.file
    };
    const filePath = path.join(__dirname,'public','Files','Material');
    res.sendFile(`${filePath}/${data.fileName}`);

});

app.listen(2711);