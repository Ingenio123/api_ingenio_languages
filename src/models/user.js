const {Schema,model} = require('mongoose')
const {hash,genSalt,compare} = require('bcrypt')

const userSchema =  new Schema({
    username: {
        type:String,
        required:true, 
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true,
      
    },
    your_lenguage:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    date: {
      type: Date,
      default: Date.now
    },
    curses:[{
        type: Schema.Types.ObjectId,
        ref:"Courses"
    }],
    numberCell:{
        type:Number
    },
    roles:[{
        type:Schema.Types.ObjectId,
        ref:'Role'
    }]

},{ timestamps: true })


/* ----------------------------------------------------------
    verificacion  si esta guardando el password encriptarlo  
------------------------------------------------------------- */

userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified("password")) return next();
    const salt = await genSalt(10);
    const hashPassword  = await hash(user.password, salt);
    user.password = hashPassword ;
    next();
})

/* ----------------------------------------------------------
    methos de  password de comparacion de password  
------------------------------------------------------------- */

userSchema.methods.comparePassword = async function(password){
    return await compare(password,this.password)
}

userSchema.plugin(require('mongoose-autopopulate'));
module.exports  =  model("User",userSchema);



