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
                err: 'The user information could not be retrieved.',
            });
        })
})

// POST
server.post('/users', (req, res) => {
    const  userInfo = req.body; 
    console.log('req body', req.body);
    
    db.add(userInfo)
        .then(user => {
            res.status(201).json({
                success: true, user});
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err: 'The user information could not be retrieved.',
            });
        });
})

// DELETE
server.delete('/users/:id', (req, res) => {
    const { id } = req.params;

        db.remove(id)
            .then(deleted => {
                if (deleted) {
                    res.status(204).end();
                } else {
                    res.status(404).json({
                        success: false,
                        message: 'The user with the specified ID does not exist.'
                    });
                }
            })
                .catch(err => {
                    res.status(500).json({
                        success: false,
                        err
                    })
                })
})

// PUT
server.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.update(id, changes)
      .then(updated => {
          if (updated) {
              res.status(200).json({
                  success: true, updated });
          } else {
              res.status(404).json({
                  success: false,
                  message: 'The user with the specified ID does not exist.',
              });
          }
      })
      .catch(err => {
          res.status(500).json({
              success: false,
              err,
          });
      });
});

// GET by ID
server.get('/users/:id', (req, res) => {
    db.findById(req.params.id)
        .find(user => {
            if (user) {
                res.status(200).json({
                    success: true,
                    user,
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'The user with the specified ID does not exist.'
                })
            }
        });
})

server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n')
})