import mongoose from 'mongoose'

const SubjectSchema=new mongoose.Schema({
    name:String,
    // prevs:[{type:mongoose.Schema.Types.ObjectId,ref:'Prev'}],
    // falsePositives:[
    //     {type:mongoose.Schema.Types.ObjectId,ref:'FalsePositive'}
    // ],
    mainLevel:Number,
    levels:[
        {
            number:{type:Number},
            currents:{
                questions:[{type:mongoose.Schema.Types.ObjectId,ref:'Question'}],
                // lectures:[{type:mongoose.Schema.Types.ObjectId,ref:'Lecture'}]
            },
            pretest:{
                questions:[{type:mongoose.Schema.Types.ObjectId,ref:'Question'}], 
            }
        }
    ]
})

module.exports=mongoose.models.Subject || mongoose.model('Subject', SubjectSchema)