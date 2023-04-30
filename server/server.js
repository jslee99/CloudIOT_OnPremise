const express = require('express');
const app = express();

app.get('/', (req, res) =>{
    // get data from S3
    // then sho data

    res.send('show data!!');
});

app.listen(3000);