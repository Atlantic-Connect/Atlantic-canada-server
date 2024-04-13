const { Int32 } = require("mongodb");
const mongoose=require("mongoose");

const servicegasSchema = new mongoose.Schema({
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

  
const svs_gas_stations = mongoose.model('svs_gas_stations', servicegasSchema);

module.exports = svs_gas_stations;
