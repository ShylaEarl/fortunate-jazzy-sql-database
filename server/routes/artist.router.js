const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

//GET route for artist table in jazzy_sql database
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "artist" ORDER BY "birthdate" DESC;';
    pool.query(queryText)
        .then(dbResult => {
            res.send(dbResult.rows);
        })
        .catch((error) => {
            console.log(`Error making query ${queryText}`, error);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    console.log('in artist POST', req.body);
    const artistToAdd = req.body;
    const queryString = `INSERT INTO "artist" ("name", "birthdate")
                        VALUES ($1, $2);`;
    const queryArguments = [
        artistToAdd.name,
        artistToAdd.birthdate
    ];
    pool.query(queryString, queryArguments)
    //get back DB results
    .then(function (dbResults) {
        res.sendStatus(201);
    })
    .catch(function (error) {
        console.log('in artist POST', error);
        res.sendStatus(500);
    });
});

module.exports = router;

//////CUT CODE/////////
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