const model = require('../videoSchema');


const getVideoPlayList = async(req,res)=>{
    let data1 = await model.videoSchema.find();
    res.send(data1);
};


module.exports = { getVideoPlayList };