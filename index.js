const express = require('express')

const server = express();

const db = require('./data/db.js');

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello World');
});

// Endpoints

server.get('/', (req, res) => {
    const date = new Date().toISOString();
    res.send(date);
})


//GET
server.get('/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err
            });
        })
})




server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n')
})