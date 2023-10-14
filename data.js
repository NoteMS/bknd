const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 2711;
const jp = require('path');
const model = require('./schema.js');

const url = "mongodb://127.0.0.1:27017/MiniProject";

const connect = mongoose.connect(url);



app.listen(2711);