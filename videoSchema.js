const mongoose = require('mongoose');

let videoSchema = new mongoose.Schema(
    {
        title: String,
        link: String
    }
);

module.exports = {
    'videoSchema': mongoose.model('videoInfos', videoSchema)
};