const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const Pool = pg.Pool;
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

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});

// TODO - Replace static content with a database tables
const artistList = [ 
    // {
    //     name: 'Ella Fitzgerald',
    //     birthdate: '04-25-1917'
    // },
    // {
    //     name: 'Dave Brubeck',
    //     birthdate: '12-06-1920'
    // },       
    // {
    //     name: 'Miles Davis',
    //     birthdate: '05-26-1926'
    // },
    // {
    //     name: 'Esperanza Spalding',
    //     birthdate: '10-18-1984'
    // },
]
const songList = [
    // {
    //     title: 'Take Five',
    //     length: '5:24',
    //     released: '1959-09-29'
    // },
    // {
    //     title: 'So What',
    //     length: '9:22',
    //     released: '1959-08-17'
    // },
    // {
    //     title: 'Black Gold',
    //     length: '5:17',
    //     released: '2012-02-01'
    // }
];

//do we need this once we write the router GET?
// app.get('/artist', (req, res) => {
//     console.log(`In /artist GET`);
//     res.send(artistList);
// });

//router is currently not defined so until I move it 
//to a module I'm using app instead
//GET route for artist table in jazzy_sql database
app.get('/artist', (req, res) => {
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

app.post('/artist', (req, res) => {
    artistList.push(req.body);
    res.sendStatus(201);
});

// app.get('/song', (req, res) => {
//     console.log(`In /songs GET`);
//     res.send(songList);
// });

//GET route for song table in jazzy_sql database
app.get('/song', (req, res) => {
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

app.post('/song', (req, res) => {
    songList.push(req.body);
    res.sendStatus(201);
});


