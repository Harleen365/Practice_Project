const asyncHandler=require("express-async-handler");
const Newsletter=require("../model/newsletterModel");
const getNewsletter=asyncHandler(async(req,res)=>{
    try{
const data=await Newsletter.find({});
res.
    }
    catch(err){
        res.status(404).json({err:err.message})
    }


})
const createNewsletter=asyncHandler(async(req,res)=>{

})
module.exports={getNewsletter,createNewsletter}