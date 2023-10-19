
const jp = require('path');
const path = jp.join(__dirname,'..','public');
// const publicPath = jp.join(__dirname, '..', 'public', 'Files');
const TeacherDashboard = jp.join(__dirname, '..', 'public', 'Files','TeacherDashboard');
const StudentDashboard = jp.join(__dirname, '..', 'public', 'Files','StudentDashboard');
const model = require('../schema.js');

const sendRegistrationPage =  (res, rep) => {
    rep.sendFile(`${path}/registration.html`);
};

const InsertStudentData = async (res, rep) => {
    let data = res.body;
    if (data.year == null || data.password != data.repassword) {
        rep.sendFile(`${path}/registration.html`);
    }
    else {
        let mo = model[2];
        let validId = await mo.find({ id: data.id });
        
        if (Object.keys(validId).length == 0) {
            rep.sendFile(`${path}/registration.html`);
        }
        else {
            let mo = model[0];
            let psw = data.password;
            psw = btoa(psw);


            let data1 = {
                id: data.id,
                email: data.email,
                name: data.name,
                password: psw
            };

            try {
                let a = new mo(data1);
                await a.save();

                // rep.send("SuccessFully Register")
                rep.sendFile(`${StudentDashboard}/index.html`);
            }
            catch (err) {
                // rep.send('Registration Failed');
                rep.sendFile(`${path}/registration.html`);
                console.log(err);
            }
        }
    }
};


const InsertTeacherData = async (res, rep) => {
    let data = res.body;

    if (data.password != data.repassword) {
        rep.sendFile(`${path}/registration.html`);
    }
    else {
        let psw = data.password;
        psw = btoa(psw);


        let data1 = {
            id: data.id,
            email: data.email,
            name: data.name,
            password: psw
        };

        try {
            let mo = model[1];
            let a = new mo(data1);
            await a.save();

            // rep.send(a);
            rep.sendFile(`${TeacherDashboard}/index.html`)
        }
        catch (err) {
            // rep.send('Registration Failed');
            rep.sendFile(`${path}/registration.html`);
            console.log(err);
        }
    }
};


module.exports = {sendRegistrationPage , InsertStudentData , InsertTeacherData};