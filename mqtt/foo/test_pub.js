const mqtt = require('mqtt');

const options ={
    host: '3.35.41.124', //127.0.0.1도 ok
    port: 1883,
    protocol : 'mqtt'
};

const client = mqtt.connect(options);

client.on('connect', () =>{
    console.log('Connection Complete!!');
    client.publish('sleep_data', 'sleep_data_ex', {retain:true, qos:1});
    client.end();
})