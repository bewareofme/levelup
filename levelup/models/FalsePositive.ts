import mongoose from 'mongoose'

const FalsePositiveSchema=new mongoose.Schema({
    subject:String,
    name:String,
    questions:[
        {type:mongoose.Schema.Types.ObjectId,ref:'Question'}
    ],
})

module.exports=mongoose.models.FalsePositive || mongoose.model('FalsePositive', FalsePositiveSchema)