const express = require('express');
const app = express.Router();
const PORT = process.env.PORT || 2711;
const jp = require('path');
const { sendRegistrationPage, InsertStudentData , InsertTeacherData } = require('./Handler/registration.js');
const { SendLoginPage, UserLogin } = require('./Handler/loginHandler.js');
const { GetStudentData, GetHelpPage , DashboardIFrame , DisplayMaterial , ShowMaterialTeacherDashboard , fileList , openFile } = require('./Handler/DashboardHandler.js');
const { upload , UploadFile } = require('./Handler/uploadHandler.js');
const { addUser , UpdateUserApi, DeleteUserApi } = require('./Handler/settingHandler.js');

let path = jp.join(__dirname, 'public');
const publicPath = jp.join(__dirname, 'public', 'Files');
const TeacherDashboard = jp.join(__dirname, 'public', 'Files','TeacherDashboard');

app.use(express.urlencoded());
// app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.static(publicPath));
app.use(express.static(TeacherDashboard));

// Registration Routes
app.get('/registration', sendRegistrationPage);
app.post('/studentRegistration', InsertStudentData );
app.post('/teacherRegistration', InsertTeacherData );


// Login Routes
app.get('/registration/login', SendLoginPage );
app.post('/CheckUser', UserLogin);

// Dashboard Files
app.get('/getStudentData',GetStudentData);//--> Fetch Student Info

app.get('/fileList', fileList); // Displaying Filenames
app.get('/openFile', openFile);


// Check Iframe
app.get('/DisplayMaterial',DisplayMaterial);
app.get('/dashboardIframe',DashboardIFrame); 
app.get('/getHelpPage',GetHelpPage);


// Material
app.get('/ShowMaterialTeacherDashboard',ShowMaterialTeacherDashboard);
app.post('/upload1' , upload ,UploadFile);


// Settings
app.post('/addUserApi',addUser);
app.post('/updateUserApi',UpdateUserApi);
app.post('/DeleteUserApi',DeleteUserApi);

module.exports = app;