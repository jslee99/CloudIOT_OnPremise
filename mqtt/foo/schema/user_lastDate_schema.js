const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  // _id 부분은 기본적으로 생략. 알아서 Object.id를 넣어줌
    user: {
        type: String
    },
    lastDate:{
        type: Date
    }
});

module.exports = mongoose.model('user_lastDate', userSchema);