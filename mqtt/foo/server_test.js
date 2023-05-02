const express = require('express');
const connect = require('./schema/connection');
const create = require('./mongod_test');

const app = express();
connect.connect();

app.get('/', (req, res)=>{
    create.create_user_lastDate();
    res.send('hi');
})

app.get('/d', (req, res)=>{
    connect.disconnect();
    res.send('bye');
})

app.listen(3000);
