const { Int32 } = require("mongodb");
const mongoose=require("mongoose");

const serviceagentSchema = new mongoose.Schema({
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

  
const svs_realest_agents = mongoose.model('svs_realest_agents', serviceagentSchema);

module.exports = svs_realest_agents;
