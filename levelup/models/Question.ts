import mongoose from 'mongoose'

const QuestionSchema=new mongoose.Schema({
    isPretest:Boolean,
    isPrev:Boolean,
    week:Number,
    subject:String,
    title:String,
    name:{type:String},
    dependency:{type:String},
    video:{type:String},
    checkboxAnswer:{type:Number},
    methodAnswer:{type:String},
    isFalsePositive:Boolean,
    checkBoxChoices:[]
})

module.exports=mongoose.models.Question || mongoose.model('Question', QuestionSchema)