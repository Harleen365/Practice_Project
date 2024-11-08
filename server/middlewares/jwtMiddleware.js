/*const jwt=require('jsonwebtoken');
const createToken=jwt.sign(payload, process.env,PRIVATE_KEY,(err,token)=>{
    if(err){
        console.log("INVALID",err.message);
    }
    else{
        console.log(token);
    }
});
//verify a token
jwt.verify(token,process.env.PRIVATE_KEY,function(err,decoded){
    console.log(decoded.foo)
});
//invalid token
try{
    var decoded=jwt.verify(token,'wrong-secret');
}*/


/*const jwt = require('jsonwebtoken');

// Define the payload and secret
const payload = { foo: 'bar' }; // Replace with your actual payload data
const secret = process.env.PRIVATE_KEY || 'default_secret_key';

// Create a token
jwt.sign(payload, secret, (err, token) => {
  if (err) {
    console.log("INVALID", err.message);
  } else {
    console.log("Generated Token:", token);

    // Verify the token asynchronously with the correct secret
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log("Verification Error:", err.message);
      } else {
        console.log("Decoded Data:", decoded);
      }
    });

    // Invalid token verification (wrong secret) - asynchronous
    jwt.verify(token, 'wrong-secret', (err, decoded) => {
      if (err) {
        console.log("Invalid Token Error:", err.message);
      } else {
        console.log("Decoded Data with Wrong Secret:", decoded); // Won't be reached
      }
    });

    // Invalid token verification - synchronous
    try {
      var decoded = jwt.verify(token, 'wrong-secret');
    } catch (err) {
      console.log("Synchronous Verification Error:", err.message);
    }
  }
});

// Verify a token with a symmetric key (for reference)
jwt.verify(token, 'shhhhh', function(err, decoded) {
  if (err) {
    console.log("Verification Error with 'shhhhh' Secret:", err.message);
  } else {
    console.log("Decoded Data with 'shhhhh' Secret:", decoded.foo); // 'bar' if valid
  }
});

*/
/*
var jwt=require('jsonwebtoken');
const generateToken=(userData)=>{
  //in this fuc we are creating new jwt token to provide user,for login session management or authorization purpose
  return jwt.sign(userData,process.env.PRIVATE_KEY)
}
const validateJwtToken=(req,res,next)=>{
  //first we are checking that jwt token is available or not
  const authorization=req.headers.authorization;//token fetch kara hai
  //output 1: Bearer dhsiuguerueb
  //output 2: gfuehfoerherc
  //output 3:
  //output 4: TOKEN bana hi nhi hai local ho ya end point testing se bheja ho, without token header send kra hai

  if(!authorization){
     return res.status(401).json({err:'Token not available'});
  }
//we are storing the token value from headers and splitting to get Bearer xyzabc.kjh to xyzabc.kjh  
  const token=req.headers.authorization.split(' ')[1]//Bearer hugsuiwgw mein se hugsuiwgw ko nikalne k liye


  //token aaya but unauthorized hai (if token provided is wrong)
  if(!token){
    return res.status(401).json({err:'Unauthorized user'});
  }

  try{
    //if token is validated or verified then movce to next middleware or respond back to client
      const validateToken=jwt.verify(token,process.env.PRIVATE_KEY);
      req.user=validateToken;
      next();
  
  }
  catch(err){
    console.error("Error occured",err.message);
  }
}

module.exports= {generateToken,validateJwtToken};

*/



const jwt = require('jsonwebtoken');

const generateToken = (userData) => {
    return jwt.sign(userData, process.env.PRIVATE_KEY);
};

const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ err: 'Token not available' });
    }

    const token = authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ err: 'Unauthorized User' });
    }

    try {
        const validateToken = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = validateToken;
        next();
    } catch (err) {
        console.error("Error occurred: ", err.message);
        return res.status(403).json({ err: 'Invalid token' });
    }
};

module.exports = { jwtAuthMiddleware, generateToken };