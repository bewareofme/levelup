import mongoose from 'mongoose'

const PrevSchema=new mongoose.Schema({
    subject:String,
    name:String,
    lecture:{type:mongoose.Schema.Types.ObjectId,ref:'Lecture'},
    questions:[{type:mongoose.Schema.Types.ObjectId,ref:'Question'}],
})

module.exports=mongoose.models.Prev || mongoose.model('Prev', PrevSchema)