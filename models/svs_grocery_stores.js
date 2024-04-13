const { Int32 } = require("mongodb");
const mongoose=require("mongoose");

const servicegrocerySchema = new mongoose.Schema({
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

  
const svs_grocery_stores = mongoose.model('svs_grocery_stores', servicegrocerySchema);

module.exports = svs_grocery_stores;
