const { Int32 } = require("mongodb");
const mongoose=require("mongoose");

const servicebankSchema = new mongoose.Schema({
    subsvs_name:{
        type:String
    },
    subsvs_desc:{
        type:String
    },
    
subsvs_links:{
        type:String
    },
    subsvs_img:{
        type:String
    },
    
subsvs_youtube_url:{
        type:String
    }
    
  });

  
const svs_bank = mongoose.model('svs_bank', servicebankSchema);

module.exports = svs_bank;
