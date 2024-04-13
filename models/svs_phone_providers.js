const { Int32 } = require("mongodb");
const mongoose=require("mongoose");

const servicephoneSchema = new mongoose.Schema({
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

  
const svs_phone_providers = mongoose.model('svs_phone_providers', servicephoneSchema);

module.exports = svs_phone_providers;
