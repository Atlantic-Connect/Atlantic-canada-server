const { Int32 } = require("mongodb");
const mongoose=require("mongoose");

const serviceconsultSchema = new mongoose.Schema({
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

  
const svs_imgn_consult = mongoose.model('svs_imgn_consult', serviceconsultSchema);

module.exports = svs_imgn_consult;
