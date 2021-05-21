const User = require('../models/user')
const jwt =  require('jsonwebtoken')
const Role = require('../models/roles')

const registerUser = async  (req,res)=>{
    const {username,email,password,confirmPassword,your_lenguage,age,roles} = req.body;
    
    
    if(!username || !email || !password || !confirmPassword || !your_lenguage || !age ){
        return res.status(401).json({
            msg:"datos incompletos"
        });
    }

    const newUser = new User({
        username,
        email,
        password,
        your_lenguage,
        age
    })
    
    if(roles){
        const foundRoles = await Role.find({name:{$in: roles }})
        newUser.roles = foundRoles.map(role => role._id);
    }else{
        const role  = await Role.findOne({name:"user"})
 
        newUser.roles = [role._id]
    }


    const  saveUser = await newUser.save();

    return res.status(201).json({
        success:true,
        message:{
            user: "user creates succefully",
            data: saveUser
        }
    })  
}

const signInUser =  async (req,res,next)=>{
    const {email,password} = req.body; 
    const user   = await User.findOne({email});

    if(!user) return res.status(401).json({
        success:false,
        message: "user not foud, whit the given  email! "
    })
    

    const isMatch = await user.comparePassword(password);
    if(!isMatch) return res.status(400).json({success:true,message:"email / password doest not match!"})
    const userToken = {id: user._id}
    // const secret  =  'secret'
    
    const token  = await  jwt.sign( userToken, 'secret',{
        expiresIn: 60 * 60 * 24,
    })

    res.header('auth-token',token).json({
        error:null, 
        data:token
    })
}

module.exports = {
    registerUser,
    signInUser

}