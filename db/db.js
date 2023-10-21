const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'hw10',
    password: 'BROWN 100',
    port: 5432,
});

client.connect()
    .then(console.log("Connected to DB!"))
    .catch((err)=>{console.log("Something went wrong! - ",err.message)});

module.exports = client;