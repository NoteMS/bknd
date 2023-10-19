const models = require('../loginSchema.js');
const jp = require('path');
let path = jp.join(__dirname, '..' , 'public');
const publicPath = jp.join(__dirname, '..', 'public', 'Files');
const TeacherDashboard = jp.join(__dirname, '..', 'public', 'Files','TeacherDashboard');
const StudentDashboard = jp.join(__dirname, '..', 'public', 'Files','StudentDashboard');
console.log(path);


const SendLoginPage =  (res, rep) => {
    rep.sendFile(`${path}/login.html`);
};

const UserLogin =  async (rep, res) => {
    // Fetch Data From File

    let data = rep.body;

    let mod = models.StudentLogin;
    let psw = btoa(data.password);
    let f = await mod.find({
        "id": data.id,
        "password": psw
    });

    let correctUser = false;
    let student = false;

    if (f.length) {
        correctUser = true;
        student = true;
    }
    else {
        let psw = btoa(data.password);
        mod = models.TeacherLogin;
        f = await mod.find({
            "id": data.id,
            "password": psw
        });

        if (f.length) {
            correctUser = true;
        }
    }

    if (correctUser) {
        if(student)
        {
            // res.send(`Welcome Student`);
            res.sendFile(`${StudentDashboard}/index.html`)
        }
        else
        {
            res.sendFile(`${TeacherDashboard}/index.html`)
        }
    }
    else {
        res.sendFile(`${path}/login.html`);
    }
};

module.exports = { SendLoginPage , UserLogin };