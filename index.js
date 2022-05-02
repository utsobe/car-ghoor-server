const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// use middleware 
app.use(cors());
app.use(express.json())

const users = [
    { name: 'Salman Khan', email: 'salman@khan.com' },
    { name: 'Amir Khan', email: 'amir@khan.com' },
    { name: 'Nawaj Ali Siddiki', email: 'nawaj@siddiki.com' },
];

app.get('/users', (req, res) => {
    res.send(users);
})

app.get('/', (req, res) => {
    res.send('This is our car ghoor API');
});

app.listen(port, () => {
    console.log('The server running by PORT', port);
})