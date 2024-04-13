const { Int32 } = require("mongodb");
const mongoose=require("mongoose");

const serviceroadSchema = new mongoose.Schema({
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

  
const svs_rdside_asist = mongoose.model('svs_rdside_asist', serviceroadSchema);

module.exports = svs_rdside_asist;
