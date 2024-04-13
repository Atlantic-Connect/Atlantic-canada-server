const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
 
    user_name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    user_type:{
        type:String
    },
    province_id:{
        type:String
    },
    province_name:{
        type:String
    },
    profile_image:{
        type:String
    }
    
  });

  
const users = mongoose.model('user', userSchema);
module.exports=users;
