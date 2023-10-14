const model = require('../loginSchema');

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
            res.send(`Update Successfully, Know User Need To Register Once Again...`);
        }
        else {
            res.send(`No User Available.....`)
        }
    }
    catch (err) {
        res.send(`User Not Update due to : ${err}`);
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
                res.send(`Delete Successfully...`);
            }
            else {
                res.send(`No User Available.....`)
            }
        }
        catch (err) {
            console.log(`error in AddUserSchema :-> ${err}`)
        }

    }
    catch (err) {
        res.send(`User Not Delete due to : ${err}`);
    }
}



module.exports = { addUser, UpdateUserApi, DeleteUserApi };