import mongoose from 'mongoose'

const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    hashedPassword:{type:String,required:true},
    subject:[{
        name:String,
        // subscription:{type:Boolean},
        currents:{
            questions:[{type:mongoose.Schema.Types.ObjectId,ref:'Question'}]
        },
        falsePositives:[{
            status:[{type:String}],
            falsePositiveDoc:{type:mongoose.Schema.Types.ObjectId,ref:'FalsePositive'},
        }],
        prevs:[{
            name:{type:String},
            prevList:[
                {type:mongoose.Schema.Types.ObjectId,ref:'Prev'}
            ],
                tryAmount:[{type:Number}],
                activity:{type:Boolean},
                completion:{type:Boolean}
        }],
        max:{type:Number},
        userLevel:Number,
        preTestCheck:[{type:mongoose.Schema.Types.ObjectId,ref:'Question'}]
    }]
})
module.exports=mongoose.models.User || mongoose.model('User', UserSchema)