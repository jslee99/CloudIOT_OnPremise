const express = require('express');
const app = express();

const template = require('./lib/template.js');

const { MongoClient } = require("mongodb");
const db_url = "mongodb://3.35.41.124:27017/";//127.0.0.1 ok

async function get_data(entire_date) {
    const client = new MongoClient(db_url);
    var movie;
    try {
      const database = client.db('cloud_iot');
      const movies = database.collection('date_environment_sleep');
      const query = {
        date : {
            $gte : new Date(entire_date + 'T00:00:00.000Z'),
            $lt : new Date(entire_date + 'T23:59:59.000Z')
        }
      };
      movie = await movies.find(query).toArray();
      console.log(movie);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
    return movie;
  }

// ===========================init

app.get('/', (req, res) =>{
    var html = template.index_HTML();
    res.send(html);
});

app.use(express.urlencoded({extended:false}));

app.post('/', (req, res) => {

    //parsing input and get data
    var entire_date = req.body.date;

    get_data(entire_date).then((result) => {
        body = ``;
        result.forEach(element =>{
            body += element.environment + '\n';
        });
        res.send(body);
    });

});

app.listen(3000);