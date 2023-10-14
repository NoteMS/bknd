const express = require('express');
const mongoose = require('mongoose');
const app = express();
// const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 2711;
const jp = require('path');
const model = require('./loginSchema.js');
const { SendLoginPage } = require('./Handler/loginHandler.js');

const publicPath = jp.join(__dirname, 'public');
app.use(express.static(publicPath));
app.use(express.urlencoded());
app.use(express.json());
// app.use(cookieParser());

let path = jp.join(__dirname, 'public');

app.get('/loginPage', SendLoginPage );

app.post('/CheckUser', async (rep, res) => {
    // Fetch Data From File

    let data = rep.body;

    let mod = model[0];
    let psw = btoa(data.password);
    let f = await mod.find({
        "id": data.id,
        "password": psw
    });

    let correctUser = false;

    if (f.length) {
        // res.cookie("user", "student");
        correctUser = true;
    }
    else {
        let psw = btoa(data.password);
        mod = model[1];
        f = await mod.find({
            "id": data.id,
            "password": psw
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