const nodemailer = require('nodemailer');
const users = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const { transporter } = require("../config/emailConfig");
// Import nodemailer for email sending




// create json web token
const maxAge = 3 * 24 * 60 * 60;
const secretKey = 'net ninja secret'; // You should use a secure secret key

const createToken = (id) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  });
};

async function handleUserSignup(req, res) {
  try {
    const data = req.body;
    const hashedPassword = await bcrypt.hash(data.password, 10); // 10 is the salt rounds
    
    // Replace the plain text password with the hashed password
    data.password = hashedPassword;
    console.log(data.password);
    const exist =await users.findOne({email:data.email})
   
    if(exist){
      res.send({"status":"failed","message":"Email alredy Exists"})
      console.log("response send successfully");
    }
    else {
      // Insert new user data into the database
      const user = await users.create(data);
    
      console.log(user);
      const saved_user = await users.findOne({email: user.email});
      console.log(saved_user);
    
      const token =jwt.sign({userID:user._id},"ATLANTIC_CANADA",{expiresIn:'5d'})// Assuming user has _id field


      console.log(token);
    
      // Respond with the user data and token
      res.send({
        token:token,
        data:{email:user.email, province_id:user.province_id, user_name: user.user_name, profile_image: user.profile_image  }
      })
    
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await users.findOne({ email });
   
    if (!user) {
      // Email not found, send specific error
      return res.status(404).json({ error: 'Email not found' });
    }

    // Compare the hashed password with the provided password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    

    if (!isPasswordValid) {
      // Password is incorrect, send specific error
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token =jwt.sign({userID:user._id},"ATLANTIC_CANADA",{expiresIn:'5d'})// Assuming user has _id field


    console.log(token);

    res.send({
      token:token,
      data:{email:user.email, province_id:user.province_id, user_name: user.user_name, profile_image: user.profile_image, _id:user._id }
    })

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function changeUserPassword(req,res){
  console.log("happy birthday")
}
async function logout_get (req, res)  {
  res.cookie('jwt', '', { maxAge: 1 });
  res.send('cookie deleted');
}



async function sendUserPasswordResetEmail(req,res){

  let config={
    service :'gmail',
    auth:{
      user:'atlanticconnectapp@gmail.com',
      pass:'xrnk vryq okla ywtz'
    }
  }

  let transporter=nodemailer.createTransport(config);
 
      const {email} =req.body;

      if(email){
          const user = await users.findOne({email:email});
          console.log(user);
          const secret=user._id + 'ATLANTIC_CANADA';
          if(user){
              const token=jwt.sign({userID: user._id}, secret, {expiresIn: '15m'});
              const link=`https://atlantic-canada-client.vercel.app/reset-password/${user._id}/${token}`
              console.log(link);
             
              // send email
              let info = await transporter.sendMail({
                from:"meetsoni784@gmail.com",
                to:user.email,
                subject:"ATLANTIC-CANADA PASSWORD RESET LINK",
                html:`<h1>If you want to change your password use below link </h1> <br>  <a href=${link}>Click here to reset you passwprd</a>`
              });
              res.send({"status":"seccess","message":"Paaword Reset email sent please check your email"})
          }
      }

      else{
        res.send({"status":"failed","message":"email doesn't exists"})
      }
}

async function sendcontactinfo(req,res){

  let config={
    service :'gmail',
    auth:{
      user:'meetsoni784@gmail.com',
      pass:'hbfw kyuf ccke chvs'
    }
  }

  let transporter=nodemailer.createTransport(config);
 
      const {email,name,message} =req.body;

      if(email){
              // send email
              let info = await transporter.sendMail({
                from:"atlanticconnectapp@gmail.com",
                to:"atlanticconnectapp@gmail.com",
                subject:"ATLANTIC-CANADA PASSWORD RESET LINK",
                html: `Email: ${email}  name:${name}  message:${message}`

              });
              res.send({"status":"seccess","message":"Paaword Reset email sent please check your email"})
      }

      else{
        res.send({"status":"failed","message":"email doesn't exists"})
      }
}

async function getuserdata(req,res){
  const {id,token} = req.params;
  const data=await users.findById(id);
  if(data){
    res.send({"data":data,"token":token})
  }

  else{
    res.send({"status":"fail","message":"you not have data"})
  }
}

async function userPasswordReset(req,res){
    const {password,password_confirmation}=req.body;
    const {id,token} = req.params;
    const user=await users.findById(id);
    const new_secret=user._id+"ATLANTIC_CANADA";
    try{
      // jwt.verify(token,new_secret);
      if(password && password_confirmation){
        if(password !== password_confirmation){
          res.send({"status":"failed","message":"New password and confirm new password doesn't match "})
        }
        else{
          const salt=await bcrypt.genSalt(10);
          const newhashedpassword=await bcrypt.hash(password,salt);
          await users.findByIdAndUpdate(user._id,{$set:{password:newhashedpassword}});
          res.send({"status":"success","message":"password reset successfully"});
        }
      }
      else{
        res.send({"status":"failed","message":"All fields are required"})
      }
    }

    catch(error){
        console.log(error);
        res.send({"status":"failed","message":"Invalid Token"})
    }
}
module.exports = {
  handleUserSignup,
  handleUserLogin,
  changeUserPassword,
  logout_get,
  sendUserPasswordResetEmail,
  userPasswordReset,
  getuserdata,
  sendcontactinfo
};
