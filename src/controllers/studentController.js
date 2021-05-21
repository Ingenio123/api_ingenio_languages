const Student = require('../models/student')

module.exports = {
    getAll: async (req,res,next)=>{
        const students = await  Student.find({},{__v:0}).sort({age: -1}).populate('courses')
        return  res.status(200).json({
            success:true,
            data: students
        })
    },
    
}