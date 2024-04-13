const mongoose = require('mongoose');
const videoSchema = new mongoose.Schema({
    // Define properties of each video object
    title: {
      type: String
    },
    url: {
      type: String
    },
    // Add more properties as needed
  });
const youtubeSchema = new mongoose.Schema({
 
   title:{
        type:String
    },
    videos: [videoSchema]
  
    
  });

  
const youtube_links = mongoose.model('youtube_links', youtubeSchema);
module.exports=youtube_links;
