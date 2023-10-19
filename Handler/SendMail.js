const nodemailer = require('nodemailer');
const path = require('path');
const help = path.join(__dirname,'..','public','Files','TeacherDashboard','helpIframe.html');

const SendMail = (req, res) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'miniproject2711@gmail.com',
            pass : 'qulj sewy xujg thxl'
        }
    });

    let mailOptions = {
        from: 'miniproject2711@gmail.com',
        to: ' poonam-comapp@msubaroda.ac.in',
        subject: 'Facing Issue!!!',
        text: 'Respected Sir/Madam,\n\t\t\t' + req.body.message +'\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tYour sincerely\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t' +req.body.name
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.send(error);
        } else {
            res.sendFile(help);
        }
    });

};


module.exports = { SendMail };