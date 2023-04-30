const { MongoClient } = require("mongodb");

//======================= mongo db
const db_url = "mongodb://3.35.41.124:27017/";//127.0.0.1 ok

async function insert_document(pi_data, fitbit_data) {//when message comes from pi_pub
    const db_client = new MongoClient(db_url);
    try {
        const database = db_client.db("cloud_iot");
        const haiku = database.collection("date_environment_sleep");
        // create a document to insert
        var KOR_date = new Date('2023-04-29T22:32:22Z');
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

insert_document('env_ex', 'fitbit_ex');