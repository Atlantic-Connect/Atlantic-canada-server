
const mongoose=require("mongoose");

const provinceSchema = new mongoose.Schema({
  
    name:{
        type:String
    },
    short_name:{
        type:String
    },
  
    
  });

  
const provinces = mongoose.model('provinces', provinceSchema);

module.exports = provinces;
