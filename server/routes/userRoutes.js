const express=require("express");
const router=express.Router();
//import {jwtAuthMiddleware} from "../middlewares/jwtMiddleware";

const { jwtAuthMiddleware, generateToken } = require("../middlewares/jwtMiddleware");
const {
    registerUser,loginUser
    
}=require("../controllers/userController");

//route for user registration
router.post("/register",registerUser);
router.post("/login", generateToken, loginUser);
//route for user login
//router.post("/login",loginUser);
module.exports=router;
