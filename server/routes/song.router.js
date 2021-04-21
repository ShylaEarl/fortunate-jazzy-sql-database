const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

//GET route for song table in jazzy_sql database
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "song" ORDER BY "title";';
    pool.query(queryText)
        .then(dbResult => {
            res.send(dbResult.rows);
        })
        .catch((error) => {
            console.log(`Error making query ${queryText}`, error);
            res.sendStatus(500);
        });
});

// app.post('/song', (req, res) => {
//     songList.push(req.body);
//     res.sendStatus(201);
// });

//router.post

module.exports = router;

/////CUT CODE///////
// const Pool = pg.Pool;

// const pool = new Pool({
//     database: 'jazzy_sql',
//     host: 'localhost',
//     port: 5432,
//     max: 10,
//     idleTimeoutMillis: 30000
// });

// pool.on('connect', () => {
//     console.log('Postgresql connected');
// });

// pool.on('error', (error) => {
//     console.log('Error with postgres pool', error);
// });