const model = require('../schema.js');
const fs = require('fs');

const jp = require('path');
const path = jp.join(__dirname, '..', 'public');
const publicPath = jp.join(__dirname, '..', 'public', 'Files');
const TeacherDashboard = jp.join(__dirname, '..', 'public', 'Files', 'TeacherDashboard');
const materialPath = jp.join(__dirname, '..', 'public', 'Files', 'Material');

const GetStudentData = async (req, res) => {
    let studentModel = model[0];
    let data = await studentModel.find();
    res.send(data);
};

const DashboardIFrame = (req, res) => {
    res.sendFile(`${TeacherDashboard}/DashboardIframe.html`);
};

const DisplayMaterial = (req, res) => {
    res.sendFile(`${TeacherDashboard}/DisplayMaterial.html`);
};

const GetFileNames = async (req, res) => {
    fs.readdir(materialPath, (err, files) => {
        // let result = Object.assign({},files);
        let result = files;
        res.send(result);
    });
}

const ShowMaterialTeacherDashboard = (req, res) => {
    let request = req.body;
    res.send(request);
};

let dir = jp.join(__dirname, '..', 'public', 'Files', 'Material');

// File Name's Button
let renderFile = jp.join(__dirname, '..', 'public');


// Display Files
const fileList = (req, res) => {
    let a = [];
    fs.readdir(dir, (err, file) => {
        file.forEach((item) => {
            a.push(item);
        })
        if (a.length == 0) {
            a = ["Empty"];
        }
        a.sort();
        res.render(`${renderFile}/render.ejs`, { a });
    })
}

const openFile = (rep, res) => {
    const data = {
        fileName: rep.query.file
    };
    const filePath = jp.join(__dirname, '..', 'public', 'Files', 'Material');
    res.sendFile(`${filePath}/${data.fileName}`);

};

const GetHelpPage = (req, res) => {
    res.sendFile(`${TeacherDashboard}/help.html`)
}


module.exports = { GetStudentData, DashboardIFrame, GetFileNames, DisplayMaterial, ShowMaterialTeacherDashboard, fileList, openFile, GetHelpPage };