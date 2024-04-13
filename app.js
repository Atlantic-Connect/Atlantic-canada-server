const express = require("express");
const bodyParser = require("body-parser");
var exphbs = require('express-handlebars');
const { requireAuth } = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');

const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = 5500;

const router = express.Router();
const users = require("./models/user");
const about_us=require("./models/about_us");
const svs_bank=require("./models/svs_bank");
const svs_gas_stations=require("./models/svs_gas_stations");
const svs_grocery_stores=require("./models/svs_grocery_stores");
const svs_public_transport=require("./models/svs_public_transport");
const svs_realest_agents=require("./models/svs_realest_agents");
const svs_phone_providers= require("./models/svs_phone_providers");
const svs_rdside_asist=require("./models/svs_rdside_asist");
const svs_imgn_consult=require("./models/svs_imgn_consult");
const youtube_links=require("./models/youtube_links");
const sub_services=require("./models/sub_services");
const provinces=require("./models/provinces");
const home_provinces=require("./models/home_province");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use("/api/user/",authRoutes);
app.use(cors({
  credentials:true,
 
}))



const multer = require('multer');

const storage = multer.memoryStorage();
 upload = multer({ storage: storage });

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

 upload = multer({ storage: storage, fileFilter: fileFilter });


 const AWS = require('aws-sdk');
  const s3 = new AWS.S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey:process.env.secretAccessKey
  });

// Multer configuration to handle file uploads
 upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});


const uploadToS3 = (file) => {
  const params = {
      Bucket: 'capstoneatlantic',
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype
  };

  return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
          if (err) {
              reject(err);
          } else {
              resolve(data.Location);
          }
      });
  });
};


// Function to save file URL to MongoDB
const saveFileURLToMongoDB = async (url) => {
  const client = new MongoClient(mongoURI, { useUnifiedTopology: true });
  try {
      await client.connect();
      const db = client.db(dbName);
      
      await sub.insertOne({ url });
      console.log('File URL saved to MongoDB');
  } catch (err) {
      console.error('Error saving file URL to MongoDB:', err);
  } finally {
      await client.close();
  }
};
const dbName="Atlantic_Canada"
const mongoURI='mongodb+srv://atlanticconnectapp:IP2jAAbLKTTikivP@cluster0.ywp5g3n.mongodb.net//';
mongoose.connect('mongodb+srv://atlanticconnectapp:IP2jAAbLKTTikivP@cluster0.ywp5g3n.mongodb.net/Atlantic_Canada', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => console.log("Getting an error:", err));




const serviceSchema = new mongoose.Schema({
 
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



app.get("/api/about_us", async (req, res) => {

  try {
    // Assuming you want to fetch all documents from the 'bank_name' collection
    
    const data = await about_us.find({});
    // console.log(data);

    res.json(data);
    // console.log("data fetching done")

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/api/services", async (req, res) => {

  try {
    // Assuming you want to fetch all documents from the 'bank_name' collection
    
    const data = await Services.find({});
    // console.log(data);

    res.json(data);
    // console.log("data fetching done")

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get("/api/subservices", async (req, res) => {

  try {
    // Assuming you want to fetch all documents from the 'bank_name' collection
    
    const data = await sub_services.find({});
    // console.log(data);

    res.json(data);
    // console.log("data fetching done")

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get("/update/:id", async (req, res) => {
    const itemId = req.params.id;
    // console.log(itemId);
  
    try {
      // Assuming Services is your Mongoose model
      const data = await Services.findById(itemId); // Use findById directly
      // console.log(data);
  
      if (!data) {
        // If no data is found for the given ID
        return res.status(404).json({ error: 'Data not found' });
      }
  
      res.json(data);
      // console.log("Data fetching done");
  
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.post("/api/services/adddata", async (req, res) => {

    try {

      const data=req.body;
    //   console.log("data fetching done")
      result=res.json(data);
      // console.log(data);

      const service=await Services.insertMany(data);
      // console.log("data added")
  
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post("/api/subservices/adddata",upload.single('file'), async (req, res) => {

    try {
      // Upload file to Amazon S3
      const fileUrl = await uploadToS3(req.file);
      console.log(fileUrl);

      // Save file URL to MongoDB
      // await saveFileURLToMongoDB(fileUrl);

      // Send response to client
      res.status(200).json({ message: 'File uploaded successfully', url: fileUrl });
  } catch (err) {
      console.error('Error handling file upload:', err);
      res.status(500).json({ error: 'Error handling file upload' });
  }

}
  );

  app.post("/api/subservices/addservicedata", async (req, res) => {

    try {
      const data=req.body;
    //   console.log("data fetching done")
      result=res.json(data);
      console.log(data);

      const service=await sub_services.insertMany(data);
      // console.log("data added")
      
  } catch (err) {
      console.error('Error handling file upload:', err);
      res.status(500).json({ error: 'Error handling file upload' });
  }

}
  );



// delete data

app.delete('/api/delete/:id', async (req, res) => {
    const itemId = req.params.id;

    try {
        // Find the item in the Services collection
        const service = await Services.findOneAndDelete({ _id: itemId });

        if (service) {
            res.status(200).json({ message: 'Data deleted successfully' });
        } else {
            res.status(404).json({ message: 'Data not found' });
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/subservice/delete/:id', async (req, res) => {
  const itemId = req.params.id;

  try {
      // Find the item in the Services collection
      const service = await sub_services.findOneAndDelete({ _id: itemId });

      if (service) {
          res.status(200).json({ message: 'Data deleted successfully' });
      } else {
          res.status(404).json({ message: 'Data not found' });
      }
  } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});




app.put("/update/:id", async (req, res) => {
    const itemId = req.params.id;
    // console.log(itemId);
    const updatedData = req.body; // Assuming the updated data is sent in the request body
    // console.log(updatedData);
    try {
      // Find the document by ID and update it
      const updatedDocument = await Services.findByIdAndUpdate(itemId, updatedData, {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validators on the update
      });
  
      if (!updatedDocument) {
        return res.status(404).json({ error: 'Data not found' });
      }
  
      res.json(updatedDocument);
      // console.log("Data updated successfully");
  
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  


  app.get("/api/getUser", async (req, res) => {

    try {
      // Assuming you want to fetch all documents from the 'bank_name' collection
      
      const data = await users.find({});
      // console.log(data);
  
      res.json(data);
      // console.log("data fetching done")
  
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



  //routes for services 
  app.get("/api/services/:param1", async (req, res) => {
    try {
      const id = req.params.param1;
      const data = await sub_services.find({svs_id:id});
   const newdata=JSON.parse(JSON.stringify(data));

    
      
      if (!data) {
        return res.status(404).json({ error: 'Data not found' });
      }
      
      res.json(newdata);
      // console.log("Data fetching done");
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

 
  // specific service
  app.get("/api/services/:param1/:param2", async (req, res) => {
    try {
      const name = req.params.param2;
      const data = await sub_services.find({subsvs_name:name});
   const newdata=JSON.parse(JSON.stringify(data));

    
      
      if (!data) {
        return res.status(404).json({ error: 'Data not found' });
      }
      // console.log(newdata)
      res.json(data);
      // console.log("Data fetching done");
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



//youtube api
app.get("/api/youtube",async(req,res)=>{
  try {
    
   
    const data = await youtube_links.find({});
   const newdata=JSON.parse(JSON.stringify(data));
   ;
  //  console.log(newdata);
    res.json(newdata);
  
    
      // console.log("data fetching done")
    

  

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


// get all provinces

app.get("/api/province",async(req,res)=>{
  try {
    
   
    const data = await provinces.find({});
   const newdata=JSON.parse(JSON.stringify(data));
   ;
  //  console.log(newdata);
    res.json(newdata);
  
    
      // console.log("data fetching done")
    

  

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})




// get all homeprovinces

app.get("/api/home_provinces",async(req,res)=>{
  try {
    
   
    const data = await home_provinces.find({});
   const newdata=JSON.parse(JSON.stringify(data));
   ;
  //  console.log(newdata);
    res.json(newdata);
  
    
      // console.log("data fetching done")
    

  

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


// get province data by id

app.get("/api/province/:id",async(req,res)=>{
  const itemId = req.params.id;
  // console.log(itemId);
  const updatedData = req.body; // Assuming the updated data is sent in the request body
  // console.log(updatedData);
  try {
    // Find the document by ID and update it
    const updatedDocument = await home_provinces.findByIdAndUpdate(itemId, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Run Mongoose validators on the update
    });

    if (!updatedDocument) {
      return res.status(404).json({ error: 'Data not found' });
    }

    res.json(updatedDocument);
    // console.log("Data updated successfully");

  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get("/api/getdatabyemail/:param1", async (req, res) => {
  try {
    const email = req.params.param1;
    const data = await users.find({email: email});
 const newdata=JSON.parse(JSON.stringify(data));

  
    
    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }
    
    res.json(newdata);
    // console.log("Data fetching done");
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// profile data update

app.put("/api/profileupdate/:email", async (req, res) => {
  try {
      const email = req.params.email;
      console.log(email); // Get the email from the URL parameter

      const updatedData = req.body; // Assuming the updated data is sent in the request body
      console.log("send data ", updatedData); // Log updated data
      var profile_image = updatedData.profile_image;
     
      if(profile_image){
        profile_image = new URL(profile_image);
        profile_image = profile_image.href
        console.log("profile_image data ", profile_image);
      }
      
      // Check if the email is valid (optional)
      else if (!email) {
          return res.status(400).json({ error: 'Email address is required' });
      }

       const updatedDocument = await users.findOneAndUpdate({ email }, updatedData, {
          new: true, // Return the updated document
          runValidators: true, // Run Mongoose validators on the update
          returnOriginal: false,
      });

      console.log("return data ", updatedDocument);
    
      res.json(updatedDocument);

  }  catch (error) {
    console.error('Error updating profile image:', error);

    // Check specific error types and provide appropriate error messages
    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }

    // Handle other errors with a generic error message
    res.status(500).json({ error: 'Internal Server Error' });
}
});


// Delete Account

app.delete("/api/deleteaccount/:email",async(req, res)=>{

  const { email } = req.params;

  try {
    // Find and delete the user with the given email
    const result = await users.findOneAndDelete({ email });

    if (result) {
      res.status(200).json({ message: 'Account deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error deleting account:', err);
    res.status(500).json({ error: 'An error occurred while deleting account' });
  }

});

app.get("/api/services/subservices/:subsvs_name/:province_id", async (req, res) => {
  try {
      const subsvs_name = req.params.subsvs_name;
      const province_id = req.params.province_id;

      const data = await sub_services.find({ subsvs_name, province_id });

      if (!data || data.length === 0) {
          return res.status(404).json({ error: 'Data not found' });
      }

      res.json(data);
      console.log("Data fetching done");
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post("/api/services/subservices", async (req, res) => {
  try {
    console.log("happy diwali")
    console.log(req.body.serviceId)
      const svs_id = req.body.serviceId;
      const province_id = req.body.provinceId;

      const data = await sub_services.find({ svs_id , province_id});

      if (!data || data.length === 0) {
          return res.status(404).json({ error: 'Data not found' });
      }

      res.json(data);
      console.log("Data fetching done");
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// add profile photo

app.post("/api/addprofilepic",upload.single('file'), async (req, res) => {

  try {
    // Upload file to Amazon S3
    const fileUrl = await uploadToS3(req.file);
    console.log(fileUrl);

    // Save file URL to MongoDB
    // await saveFileURLToMongoDB(fileUrl);

    // Send response to client
    res.status(200).json({ message: 'File uploaded successfully', url: fileUrl });
} catch (err) {
    console.error('Error handling file upload:', err);
    res.status(500).json({ error: 'Error handling file upload' });
}

}
);

// sending contact us data 

app.post("/api/sendcontact",upload.single('file'), async (req, res) => {

  try {


    
} catch (err) {
    console.error('Error handling file upload:', err);
    res.status(500).json({ error: 'Error handling file upload' });
}

}
);


app.listen(PORT, () => {
  // console.log(`Server started on port ${PORT}`);
});
