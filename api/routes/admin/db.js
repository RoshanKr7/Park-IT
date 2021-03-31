const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb+srv://richik:richik@parkit.hmsnp.mongodb.net/park_it?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

async function init() {
    await client.connect();
}

async function getManager() {
    let db = client.db();
    let Managers = await (await db.collection('managers')).find();
    var status = [];
    await Managers.forEach((history) => {
            status.push({'firstName': history['firstName'], 'lastName' : history['lastName'], 'email' : history['email'], 'parking_id': history['parking_id']})
    });
    // console.log(parkingLots);
    return status;
}

// async function getParking() {
//     let db = client.db();
//     let Parkings = await (await db.collection('parking_lots')).find();
//     var status = [];
//     await Parkings.forEach((history) => {
//         let current = await (await db.collection('parking_curr_data')).findOne({'place_id': history['place_id']});
//         status.push({'name': history['name'], 'latitude' : history['latitude'], 'longitude' : history['longitude'], 'CAP' : current['CAP'], 'TPS' : current['TPS'], 'bike': history['rate_per_hour']['bike'], 'car': history['rate_per_hour']['car'], 'truck': history['rate_per_hour']['truck'] })
//     });
//     // console.log(parkingLots);
//     return status;
// }

async function getParking() {
    let db = client.db();
    let Parkings = await (await db.collection('parking_lots')).aggregate([{ $lookup:{from: 'parking_curr_data',localField: 'place_id',foreignField: 'place_id',as: 'current'}}]);
    var status = [];
    await Parkings.forEach((history) => {
        status.push({'name': history['name'], 'latitude' : history['latitude'], 'longitude' : history['longitude'], 'CAP' : history['current'][0]['CAP'], 'TPS': history['current'][0]['TPS'], 'bike': history['rate_per_hour']['bike'], 'car': history['rate_per_hour']['car'], 'truck': history['rate_per_hour']['truck'] })
    });
    // console.log(parkingLots);
    return status;
}

async function getUser() {
    let db = client.db();
    let Users = await (await db.collection('users')).find();
    var status = [];
    await Users.forEach((history) => {
            status.push({'FirstName': history['FirstName'], 'LastName' : history['LastName'], 'email' : history['email'], 'rating': history['rating']})
    });
    // console.log(parkingLots);
    return status;
}

module.exports.init = init;
module.exports.getManager = getManager;
module.exports.getUser = getUser;
module.exports.getParking = getParking;