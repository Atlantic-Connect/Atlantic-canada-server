const jwt = require('jsonwebtoken');
const user=require("../models/user");


const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'ATLANTIC_CANADA', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
       
      } else {
        console.log(decodedToken);
        res.json('success')
        next();
      }
    });
  } else {
    res.json('http://localhost:3000/login');
  }
};

module.exports = { requireAuth };