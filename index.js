const express = require('express');
const password = 'IK0MTGjQqlsb4NeB';
// = `mongodb+srv://miniproject2711:${password}@miniproject.2fl10xe.mongodb.net/`;
//password `mongodb+srv://miniproject2711:IK0MTGjQqlsb4NeB @miniproject.2fl10xe.mongodb.net/`;
const router = require('./routes');
const app = express();
const connectMongoDb = require('./connection');

app.set('view engine', 'ejs');

const url='mongodb://127.0.0.1:27017'
connectMongoDb(url);

app.use(router);


app.listen(2711);