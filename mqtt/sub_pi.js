const mqtt = require('mqtt');
const { MongoClient } = require("mongodb");

//======================= mongo db
const db_url = "mongodb://3.35.41.124:27017/";//127.0.0.1 ok

async function insert_document(pi_data, fitbit_data) {//when message comes from pi_pub
    const db_client = new MongoClient(db_url);
    try {
        const database = db_client.db("cloud_iot");
        const haiku = database.collection("date_environment_sleep");
        // create a document to insert
        var KOR_date = new Date();
        KOR_date.setHours(KOR_date.getHours() + 9); 
        const doc = {
            date : KOR_date,
            environment : pi_data,
            sleep : fitbit_data
        }
        const result = await haiku.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
      await db_client.close();
    }
  }

  
//======================= mqtt
const mqtt_options ={
    host: '3.35.41.124', //127.0.0.1 ok
    port: 1883,
    protocol : 'mqtt'
};

const mqtt_client = mqtt.connect(mqtt_options);

mqtt_client.on('connect', () =>{
    console.log('Connection Complete!!');
    mqtt_client.subscribe('sleep_data', {qos:1});
});


mqtt_client.on("error", (error) => { 
  console.log("Can't connect / " + error);
});

mqtt_client.on('message', (topic, message, packet) => {
    // retrieve msg, get fitbit data from fitbit server, upload data pair(fitbit data, message) to S3

    if(message.toString() == "end"){
        mqtt_client.end();
    }else{
        //get fitbit data using oauth 2.0 TODO
        const fitbit_data = 'fitbit_data';

        //get env_data from message TODO
        const environment_data = message.toString();

        insert_document(environment_data, fitbit_data);
    }
});