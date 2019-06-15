const {Pool} = require('pg');

const conn = new Pool({
    user:'postgres',
    password:'.',
    database:'vue_pg_crud',
    host:'localhost',
    port:5432,
    max:5,
    connectionTimeoutMillis:15000,
    idleTimeoutMillis:10000
});

module.exports={conn};