const fs = require('fs');
const path = require('path');
const express = require('express');
const { url } = require('inspector');
const app = express();

let dir = path.join(__dirname, 'public/Files');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public','Files')));

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
        // console.log(a);
        // a.pop('PDFViewer.ejs');
        if(a.length == 0)
        {
            a = ["Empty"];
        }
        res.render(__dirname + "/public/render.ejs", { a });
        // res.sendFile(__dirname + "/public/Files/render.html")
    });
});

app.get('/openFile', (rep, res) => {
    const data = {
        fileName: rep.query.file
    };

    const filePath = path.join(__dirname,'public','Files','PDFViewer.ejs');
    res.render(filePath,{data});

});

/*
app.get('/openFile',(rep,res)=>{
    console.log("Hello");
    console.log(rep.query.file);
    // res.send(rep.query.file);
    const data = {
        fileName: rep.query.file, // Replace with your data
    };

    const filePath = path.join(__dirname,'public','PDFViewer.ejs');
    const destinationFile = path.join(__dirname,'public','Files',data.fileName);

    // Read the HTML file
    const fs = require('fs');
    const htmlTemplate = fs.readFileSync(filePath, 'utf8');

    // Replace placeholders in the HTML template with data
    const modifiedHtml = htmlTemplate.replace('<span id="username"></span>', data.fileName);
    const modifiedHtml2 = modifiedHtml.replace('<embed src="" width="800px" height="500px">', '<embed src="'+ destinationFile +'" width="800px" height="500px">');


    // Send the modified HTML as the response
    res.send(modifiedHtml2);
});
*/

app.get('/', (req, res) => {
    const filename = 'public/Files/bmp.pdf'; // Replace with your actual filename

    const filePath = path.join(__dirname, 'public', 'PDFViewer.ejs');
    // Render the EJS template and pass the filename as a variable
    res.render(filePath, { filename });
});

app.listen(2711);