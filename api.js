const crypto = require('crypto');
const base58 = require('base58-encode');

const api = (app, data) => {

    /*
     * GET /{shortUrl}
     * Returns a saved object
     */

    app.get('/:shortUrl', async (req, res) => {
        const docs = await data.collection.find({
            "code": req.params.shortUrl
        }).toArray();

        await data.collection.deleteMany(docs[0]);

        docs.length ? res.send(docs[0]) : res.sendStatus(404);
    });

    /*
     * POST /url
     * Saves a URL and returns the last inserted id
     */

    app.post('/url', async (req, res) => {
        const url = req.body.url;
        const code = base58(crypto.randomBytes(2));

        await data.collection.insertOne({
            code,
            url: url,
            date: new Date()
        });

        res.send(code);
    });

    /*
     * POST /all
     * Returns the current list of objects
     */

    app.post('/all', async (req, res) => {
        const all = await data.collection.find().toArray();
        res.send(all);
    });

    /*
     * POST /clear
     * Clears the current list of objects
     */

    app.post('/clear', async (req, res) => {
        const all = await data.collection.deleteMany({});
        res.send(all);
    });
};

module.exports = api;
