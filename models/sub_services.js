const { Int32 } = require("mongodb");
const mongoose=require("mongoose");

const faqSchema = new mongoose.Schema({
    // Define properties of each video object
    que: {
      type: String
    },
    ans: {
      type: String
    },
    // Add more properties as needed
  });

const subserviceSchema = new mongoose.Schema({
    svs_id:{
        type:String
    },
    subsvs_url:{
        type:String
    },
    subsvs_name:{
        type:String
    },
    subsvs_desc:{
        type:String
    },
    subsvs_sub_img:{
        type:String
    },
    
subsvs_short_desc:{
    type:String
},
    subsvs_img:{
        type:String
    },
    
    faq_Que:[faqSchema],

    sub_svs_faqs_link1:{
        type:String
    },
    subsvs_youtube_url:{
        type:String
    },
    subsvs_pramontion_link:{
        type:String
    },
    subsvs_pramontion_title:{
        type: String
    },
    faq_title:{
        type:String
    }
    
  });

  
const sub_services = mongoose.model('sub_services', subserviceSchema);

module.exports = sub_services;
