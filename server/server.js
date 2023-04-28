const express = require('express');
const app = express();

app.get('/', (req, res) =>{
    res.send('show data!!');
});

app.listen(3000);