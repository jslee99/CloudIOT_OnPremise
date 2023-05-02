const mongoose = require('mongoose');
const dbUrl = 'mongodb://cloudjs:cloudjs@3.35.41.124:27017/cloud_iot';

module.exports = {
  connect :async ()=>{
    console.log('yes');
    mongoose.connect(dbUrl, {
        dbName: 'cloud_iot', // 실제로 데이터 저장할 db명
        useNewUrlParser: true
      }).then(()=>{console.log('connection complete!!');})
      .catch((err)=>{console.log(err)});
  },
  disconnect :async ()=>{
    mongoose.connection.close();
  }
};