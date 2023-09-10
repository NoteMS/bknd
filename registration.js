const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 2711;
const jp = require('path');
const model = require('./schema.js');
const url = "mongodb+srv://khush:mydWuaT9JwuyLLti@cluster0.0sopy49.mongodb.net/Registration";

const connect = mongoose.connect(url);

app.use(express.urlencoded());
app.use(express.json());

let path = jp.join(__dirname, 'public');

// Send Registration File 
app.get('/registration', (res, rep) => {
    rep.sendFile(`${path}/registration.html`);
});

// Inserting Student Info
app.post('/studentRegistration', async (res, rep) => {
    let data = res.body;
    if(data.year == null || data.password != data.repassword)
    {
        rep.sendFile(`${path}/registration.html`);
    }
    else
    {
        try{
            let mo = model[0];
            let a = new mo(data);
            await a.save();

            rep.send(a);
        }
        catch(err)
        {
            // rep.send('Registration Failed');
            rep.sendFile(`${path}/registration.html`);
            console.log(err);
        }
    }
});


app.post('/teacherRegistration',async(res,rep)=>{
    let data = res.body;
    
    if(data.password != data.repassword)
    {
        rep.sendFile(`${path}/registration.html`);
    }
    else
    {
        try{
            let mo = model[1];
            let a = new mo(data);
            await a.save();

            rep.send(a);
        }
        catch(err)
        {
            // rep.send('Registration Failed');
            rep.sendFile(`${path}/registration.html`);
            console.log(err);
        }
    }
});

app.listen(PORT);