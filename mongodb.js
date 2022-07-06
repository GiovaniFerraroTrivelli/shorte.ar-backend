const db = require("mongodb");

const DATABASE_NAME = 'shortear';
const COLLECTION_NAME = 'urls';

const mongoDb = (url, data) => {
    db.MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, async (err, client) => {
        if (err) {
            return console.log(err);
        }

        const db = client.db(DATABASE_NAME);
        data.collection = db.collection(COLLECTION_NAME);
        await data.collection.createIndex({"code": 1});
        await data.collection.createIndex({"date": 1}, {expireAfterSeconds: 24 * 3600});

        console.log(`MongoDB Connected: ${url}`);
    });
}

module.exports = mongoDb;
