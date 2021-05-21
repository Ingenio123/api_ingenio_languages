const { Schema, model } = require('mongoose')

const studentSchema = new Schema(
    {
      firstName: { 
          type: String, required: true
         },
      lastName: {
           type: String, required: true
         },
      age: {
           type: Number, required: true
         },
      courses: [{
           type: Schema.Types.ObjectId, ref: 'Courses' 
        }],
      updatedBy: {
           type: Schema.Types.ObjectId 
        },
    },
    { timestamps: true }
  );
studentSchema.plugin(require('mongoose-autopopulate'));
module.exports = model('Student',studentSchema);
  