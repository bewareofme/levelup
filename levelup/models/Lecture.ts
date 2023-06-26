import mongoose from 'mongoose'

const LectureSchema=new mongoose.Schema({
    week:String,
    subject:String,
    name:{type:String},
    video:{type:String},
})

module.exports=mongoose.models.Lecture || mongoose.model('Lecture', LectureSchema)