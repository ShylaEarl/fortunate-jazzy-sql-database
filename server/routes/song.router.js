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

//POST route for song table to recieve new songs from client
router.post('/', (req, res) => {
    console.log('req.body in song POST', req.body);
    const songToAdd = req.body;
    const queryString = `INSERT INTO "song" ("title", "length", "released")
                        VALUES ($1, $2, $3);`;
                        //VALUES above, using placeholders to prevent SQL injection
    const queryArguments = [
        songToAdd.title, 
        songToAdd.length, 
        songToAdd.released];
    pool.query(queryString, queryArguments)
    //get back DB results
    .then(function (dbResults){
        res.sendStatus(201);
    })
    .catch(function (error) {
        console.log('error in song POST', error);
        res.sendStatus(500);
    });
});

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