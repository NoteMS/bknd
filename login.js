const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 2711;
const jp = require('path');
const model = require('./loginSchema.js');
const url = "mongodb+srv://khush:mydWuaT9JwuyLLti@cluster0.0sopy49.mongodb.net/Registration";

const connect = mongoose.connect(url);

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

let path = jp.join(__dirname, 'public');

app.get('/loginPage', (res, rep) => {
    rep.sendFile(`${path}/login.html`);
});

app.post('/login', async (rep, res) => {
    // Fetch Data From File

    let data = rep.body;

    let mod = model[0];

    let f = await mod.find({
        "id": data.id,
        "password": data.password
    });

    let correctUser = false;

    if (f.length) {
        res.cookie("user", "student");
        correctUser = true;
    }
    else {
        mod = model[1];
        f = await mod.find({
            "id": data.id,
            "password": data.password
        });

        if (f.length) {
            correctUser = true;
            res.cookie("user", "Teacher");
        }
    }

    if (correctUser) {
        res.send(`Welcome`);
    }
    else {
        res.sendFile(`${path}/login.html`);
    }
})


// app.get('/cookie',(res,rep)=>{
//     rep.send(res.cookies);
// });
app.listen(PORT);