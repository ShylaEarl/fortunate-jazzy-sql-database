const pg = require('pg');

//defines our version of pool 
const Pool = pg.Pool;

//creates a connection to our DB
const pool = new Pool({
    database: 'jazzy_sql',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log('Postgresql connected');
});

pool.on('error', (error) => {
    console.log('Error with postgres pool', error);
});

//shares the DB connection with other folders/files
module.exports = pool;