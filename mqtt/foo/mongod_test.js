const user_lastDate = require('./schema/user_lastDate_schema');

module.exports = {
    create_user_lastDate:async ()=>{
        var user;
        try{
            user = await user_lastDate.create({
                user: 'AA',
                lastDate : new Date()
            });
        }catch(err){
            console.log(err);
        }
        console.log(user);
    },
    selelct_user_lastDate: async()=>{
        console.log('yes');
        try{
            const users = await user_lastDate.find({});
            console.log(users);
            for(var user of users){
                console.log(user);
            }
        }catch(err){
            console.log(err);
        }
    }
};