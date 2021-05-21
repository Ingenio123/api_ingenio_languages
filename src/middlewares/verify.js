const User = require('../models/user')
const jwt = require('jsonwebtoken');
const Roles = require('../models/roles');

exports.verifyEmail =  async (req,res,next)=>{
    const userEmail = await User.findOne({ email:req.body.email })
    if(!userEmail) return next();

    return res.status(401).json({
        success:false,
        message: "Email  ya existe "
    })
    
}

exports.verifyAge = (req,res,next)=>{
    if(req.body.age > 6 && req.body.age < 85 ) return  next();
    return res.status(401).json({
        success:false,
        message: " age not accepted"
    })
}

exports.verifyToken  = async (req,res,next)=>{
    const token = req.headers['x-access-token'];
    if(!token) return res.status(401).json({success:false,message:'token  not fund '})
    const  decode = await jwt.verify(token,'secret')
    req.userId = decode.id;
    next()  
}

exports.verifyIsAdmin = async (req,res,next)=>{
    const user = await User.findById(req.userId);
    const roles = await Roles.find({_id: {$in:user.roles}})
    
    for(i=0; i< roles.length; i++){
        if(roles[i].name === "admin" ) {
            next()
            return ;
        }  
    }

    return res.status(401).json({
        success:false,
        message:"necesitas ser admin"
    })
}

exports.verifyIsTeacher = async (req,res,next)=>{
    const user = await User.findById(req.userId);
    const roles = await Roles.find({_id: {$in:user.roles}})
    
    for(i=0; i< roles.length; i++){
        if(roles[i].name === "teacher" ) {
            next()
            return ;
        }  
    }

    return res.status(401).json({
        success:false,
        message:"necesitas ser teacher"
    })
    
}

exports.verifyIsStudent = async (req,res,next)=>{
    const user = await User.findById(req.userId);
    const roles = await Roles.find({_id: {$in:user.roles}})
    
    for(i=0; i< roles.length; i++){
        if(roles[i].name === "student" ) {
            next()
            return ;
        }  
    }

    return res.status(401).json({
        success:false,
        message:"necesitas ser student"
    })
}