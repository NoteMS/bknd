const express = require('express');
const app = express();

app.use(express.urlencoded());
app.use(express.json());

let data = [
    {
        title: "Tom And Jerry",
        link : "t0Q2otsqC4I"
    },
    {
        title: "Tarak Mehta",
        link : "ESrYQsEw4nA"
    }
];

app.get('/iframe',(req,res)=>{
    res.sendFile(`${__dirname}/videoIframe.html`);
});

app.get('/',(req,res)=>{
    res.sendFile(`${__dirname}/videoPlayList.html`);
});

app.get('/playlist',(req,res)=>{
    res.send(data);
});

app.listen(2711, () => {
    console.log("Server Started");
});