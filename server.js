// Express Setup
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

// Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];  
const knex = require('knex')(config);

// bcrypt setup
let bcrypt = require('bcrypt');
const saltRounds = 10;


// Login
app.post('/api/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send();
    }
    knex('users').where('username',req.body.username).first().then(user => {
        if (user === undefined) {
            res.status(403).send("Invalid credentials");
            throw new Error('abort');
        }
      return [bcrypt.compare(req.body.password, user.hash),user];
    }).spread((result,user) => {
        if (result) {
            res.status(200).json({user:{username:user.username,name:user.name,id:user.id}});
        }
        else {
            res.status(403).send("Invalid credentials");
        }
        return;
    }).catch(error => {
        if (error.message !== 'abort') {
            console.log(error);
            res.status(500).json({ error });
        }
    });
});


// Registration
app.post('/api/users', (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.name) {
        return res.status(400).send();
    }
    knex('users').where('username', req.body.username).first().then(user => {
        if (user !== undefined) { // Checks if the username already exists
            res.status(403).send("username already exists");
            throw new Error('abort');
        }
        return bcrypt.hash(req.body.password, saltRounds);
    }).then(hash => {
        return knex('users').insert({username: req.body.username, hash: hash, name: req.body.name});
    }).then(ids => {
        return knex('users').where('id',ids[0]).first().select('username', 'name', 'id');
    }).then(user => {
        res.status(200).json({user:user});
        return;
    }).catch(error => {
        if (error.message !== 'abort') {
            console.log(error);
            res.status(500).json({ error });
        }
    });
});

// Getting a list of items from the database
app.get('/api/users/:id/items', (req, res) => {
    let id = parseInt(req.params.id);
    knex('users').join('items', 'users.id', 'items.user_id')
        .where('users.id', id) // Get from users
        .orderBy('item', 'desc') // organize by item name
        .select('*').then(items => {
            res.status(200).json({items: items});
        }).catch(err => {
            console.log(err);
            res.status(500).json({err});
        });
});

// Adding a new item to the database
app.post('/api/users/:id/items', (req, res) => {
    let id = parseInt(req.params.id);
    knex('users').where('id', id).first().then(user => {
        if (!req.body.picture) {
            return knex('items').insert({user_id: id, item: req.body.item, description: req.body.description});
        }
        return knex('items').insert({user_id: id, item: req.body.item, picture: req.body.picture, description: req.body.description});
    }).then(ids => {
        return knex('items').where('id',ids[0]).first();
    }).then(item => {
        res.status(200).json({item: item});
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error });
    });
});

// Delete an item from the database
app.post('/api/users/:id/items/:id/delete', (req, res) => {
    let item_id = parseInt(req.params.id);
    knex('items').where('id', item_id).del().then(items => {
        res.status(200).json({items:items});
    }).catch(err => {
        console.log(err);
        res.status(500).json({ err });
    })
});

// Edit an item 
app.post('/api/users/:id/items/edit', (req, res) => {
    let id = parseInt(req.params.id);
    knex('users').where('id', id).first().then(user => {

    });
})

// Search
app.get('/api/users/:id/items/search', (req, res) => {
    if (!req.query.keywords) {
        return res.status(400).send();
    }

    // Check if the offset and limit has already been set
    let offset = 0;
    if (req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    let limit = 10;
    if (req.query.limit) {
        limit = parseInt(req.query.limit);
    }

    console.log("searching keywords: " + req.query.keywords);
    knex('users').join('items', 'users.id', 'items.user_id') // Join the users and items by the user's id
        .whereRaw("MATCH (item) AGAINST ('" + req.query.keywords + "')") // Find matches in join
        .orderBy('item', 'desc')
        .limit(limit)
        .offset(offset)
        .select('item', 'picture', 'description').then(items => { // Select items to be shown
            res.status(200).json({items: items});
        }).catch(error => {
            res.status(500).json({error});
        });
});

app.listen(3000, () => console.log('Server listening on port 3000!'));