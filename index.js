const express = require('express');
const app = express();

require('dotenv').config();

const APP_PORT = process.env.PORT || 3001;
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority`;

let data = {
    collection: null
};

app.use(express.json());

require('./mongodb')(url, data);
require('./api')(app, data);

app.listen(APP_PORT, '0.0.0.0', () => {
    console.log(`shorte.ar backend listening on port ${APP_PORT}`);
})
