const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 2711;
const jp = require('path');
const model = require('./schema.js');

// const url = "mongodb://127.0.0.1:27017/MiniProject";

// const connect = mongoose.connect(url);

app.use(express.urlencoded());
app.use(express.json());

const publicPath = jp.join(__dirname, 'public','Files');
app.use(express.static(publicPath));

app.get('',async(req,res)=>{
    res.render(publicPath + '/index.html');
});

app.listen(2711);