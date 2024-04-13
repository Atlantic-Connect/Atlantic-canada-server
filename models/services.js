const { Int32 } = require("mongodb");
const mongoose=require("mongoose");

const serviceSchema = new mongoose.Schema({
    id: {
      type: Int32,
    },
    svs_name:{
        type:String
    },
    svs_loc:{
        type:String
    },
    svs_contact:{
        type:String
    },
    svs_image:{
        type:String
    },
    svs_info:{
        type:String
    }
    
  });

  
const Services = mongoose.model('services', serviceSchema);

module.exports = Services;
