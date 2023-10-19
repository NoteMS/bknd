const model = require('../loginSchema');
const jp = require('path');
const publicPath2 = jp.join(__dirname, '..' , 'public');
const fs = require('fs');
let dir = jp.join(__dirname, '..', 'public', 'Files', 'Material');

const addUser = async (req, res) => {

    let Userid = req.body.id;

    try {
        let mo = model.AddUserSchema;
        let findId = await mo.find({ id: Userid });


        if (findId.length == 0) {
            let result = new mo({ id: Userid });
            await result.save();
            res.send(`User Id Is Added...`);
        }
        else {
            res.send(`Id Is Already Available.`);
        }
    }
    catch (err) {
        res.send(`User Not Added due to : ${err}`);
    }
}


const UpdateUserApi = async (req, res) => {

    try {
        let mo = model.UpdateUserSchema;

        let deleteUser = await mo.deleteOne(req.body);

        if (deleteUser.deletedCount > 0) {
            res.send(`<h1>Update Successfully, Know User Need To Register Once Again...</h1>`);
        }
        else {
            res.send(`<h1>No User Available.....</h1>`)
        }
    }
    catch (err) {
        res.send(`<h1>User Not Update due to : ${err}</h1>`);
    }
}


const DeleteUserApi = async (req, res) => {
    let userId = req.body.id;
    try {
        let mo = model.UpdateUserSchema;

        let collection1 = await mo.deleteOne(req.body);

        try {

            let mo2 = model.AddUserSchema;

            let collection2 = await mo2.deleteOne({id : userId});

            if ((collection1.deletedCount > 0) && (collection2.deletedCount > 0)) {
                res.send(`<h1>Delete Successfully...</h1>`);
            }
            else {
                res.send(`<h1>No User Available.....</h1>`)
            }
        }
        catch (err) {
            console.log(`<h1>error in AddUserSchema :-> ${err} </h1>`)
        }

    }
    catch (err) {
        res.send(`<h1>User Not Delete due to : ${err}</h1>`);
    }
}

const getDeleteFiles = (req,res) => {
    let a = [];
    fs.readdir(dir, (err, file) => {
        file.forEach((item) => {
            a.push(item);
        })
        if (a.length == 0) {
            a = ["Empty"];
        }
        a.sort();
        res.render(`${publicPath2}/deleteFiles.ejs`,{a});
    })
};

const DeleteFilesApi = async(req,res) => {
    const data = {
        fileName: req.query.file
    };

    fs.unlink(`${dir}/${data.fileName}`,(err)=>{
        if(err) res.send(err);
        else res.send(`<h1>${data.fileName} is deleted.</h1>`);
    });

}

module.exports = { addUser, UpdateUserApi, DeleteUserApi, DeleteFilesApi , getDeleteFiles };