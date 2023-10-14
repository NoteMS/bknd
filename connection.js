const mongoose = require('mongoose');

async function connectMongoDb(url)
{
    const connect = mongoose.connect(url)
        .then(() => { console.log('connnected Successfully') })
        .catch((err) => { console.log(`Connection Fail : ${err}`) });
}

module.exports = connectMongoDb;