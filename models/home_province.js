
const mongoose=require("mongoose");

const home_provinceSchema = new mongoose.Schema({
  
    name:{
        type:String
    },
    short_name:{
        type:String
    },
  
    
  });

  
const home_provinces = mongoose.model('home_provinces', home_provinceSchema);

module.exports = home_provinces;
