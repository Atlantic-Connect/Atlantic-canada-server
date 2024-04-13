const express = require("express");
const { handleUserSignup,handleUserLogin,changeUserPassword,logout_get, sendUserPasswordResetEmail,userPasswordReset,getuserdata,sendcontactinfo } = require("../controller/authcontroller");
const {requireAuth} = require("../middleware/authMiddleware");
const app = express.Router();

// app.use("/changepassword",requireAuth)
//public routes

app.post("/signup",handleUserSignup);
app.post("/login", handleUserLogin);
app.get('/logout', logout_get);
app.post('/send-reset-password-email',sendUserPasswordResetEmail);
app.post('/reset-password/:id/:token',userPasswordReset);
app.get('/reset-password/:id/:token',getuserdata);
app.post('/sendcontactinfo',sendcontactinfo);



//protected routes

app.get("/changepassword",requireAuth, changeUserPassword);


module.exports = app;