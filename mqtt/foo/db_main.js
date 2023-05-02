const conn = require('./schema/connection');
const accessDB = require('./mongod_test');
const mongoose = require('mongoose');
const dbUrl = 'mongodb://cloudjs:cloudjs@3.35.41.124:27017/cloud_iot';

async function a(){
    await conn.connect();
    console.log('yes');
    await accessDB.create_user_lastDate();
    await accessDB.selelct_user_lastDate();
    await conn.disconnect();
};

a();
