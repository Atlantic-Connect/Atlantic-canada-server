const { Int32 } = require("mongodb");
const mongoose=require("mongoose");

const servicetransportSchema = new mongoose.Schema({
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

  
const svs_public_transport = mongoose.model('svs_public_transport', servicetransportSchema);

module.exports = svs_public_transport;
