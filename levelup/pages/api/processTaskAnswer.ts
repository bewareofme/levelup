// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const User=require( '../../models/User')
const Prev=require( '../../models/Prev')
const FalsePositive=require( '../../models/FalsePositive')

import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";
var mongoose = require('mongoose');


const processPretest=async(ID:String,userEmail:String,currentName:String,correctAnswer:Boolean,routerInfo:any)=>{
  const response=await User.findOneAndUpdate({email:userEmail},{$push:{"subject.$[subject].preTestCheck":ID }},{arrayFilters:[{"subject.name":`${routerInfo.courseId} ${routerInfo.subjectName}`}]})
  if(!correctAnswer){
    const response3=await Prev.findOne({name:currentName})
    const response4=await User.findOneAndUpdate({email:userEmail},{$push:{"subject.$[subject].prevs":{"name":response3.name,prevList:[response3._id]}}},{arrayFilters:[{"subject.name":`${routerInfo.courseId} ${routerInfo.subjectName}`}]})
  }
}

const processCurrent=async(ID:String,userEmail:String,currentName:String,correctAnswer:Boolean,routerInfo:any)=>{
    const response=await User.findOneAndUpdate({email:userEmail},{$pull:{"subject.$[subject].currents.questions":ID }},{arrayFilters:[{"subject.name":`${routerInfo.courseId} ${routerInfo.subjectName}`}]})
    const response2=await FalsePositive.findOne({name:currentName})
    const response4=correctAnswer?await User.findOneAndUpdate({email:userEmail},{$push:{"subject.$[subject].falsePositives":{"status":["+"],falsePositiveDoc:response2._id}}},{arrayFilters:[{"subject.name":`${routerInfo.courseId} ${routerInfo.subjectName}`}],upsert:true},):
    await User.findOneAndUpdate({email:userEmail},{$push:{"subject.$[subject].falsePositives":{"status":["-"],falsePositiveDoc:response2._id}}},{arrayFilters:[{"subject.name":`${routerInfo.courseId} ${routerInfo.subjectName}`}],upsert:true})
}

const passPrev=async (ID:String,userEmail:String,prevName:String,routerInfo:any)=>{
  const response=await User.findOneAndUpdate({email:userEmail},{$pull:{"subject.$[subject].prevs.$[prev].prevList":ID }},{arrayFilters:[{"subject.name":`${routerInfo.courseId} ${routerInfo.subjectName}`},{"prev.name":prevName}]})
  const currentPrev=response.subject.find((cur:any)=>cur.name===`${routerInfo.courseId} ${routerInfo.subjectName}`).prevs.find((cur:any)=>cur.name===prevName).prevList
  const currentPrev2=response.subject.find((cur:any)=>cur.name===`${routerInfo.courseId} ${routerInfo.subjectName}`).prevs.find((cur:any)=>cur.name===prevName)
  if(currentPrev.length>1){
    if(currentPrev2.tryAmount[currentPrev2.prevList.length-1]>1){
      const prevNum:Number=currentPrev2.prevList.length-1
      // console.log("passing here 2")
      const greaterResponse=await User.updateOne({email:userEmail},{$set:{["subject.$[subject].prevs.$[prevs].tryAmount."+prevNum]:0}},{arrayFilters:[{"subject.name":`${routerInfo.courseId} ${routerInfo.subjectName}`},{"prevs.name":prevName}]})
    }else{
      const prevNum:Number=currentPrev2.prevList.length-1
      // console.log(prevNum,"prevNum",currentPrev2,"currentPrev2")
      const passinghere2=await User.updateOne({email:userEmail},{$inc:{["subject.$[subject].prevs.$[prevs].tryAmount."+prevNum]:1}},{arrayFilters:[{"subject.name":`${routerInfo.courseId} ${routerInfo.subjectName}`},{"prevs.name":prevName}]})
    }
    return
  }else{
  const response2=await User.findOneAndUpdate({email:userEmail},{$pull:{"subject.$[subject].prevs":{"name":prevName}}},{arrayFilters:[{"subject.name":`${routerInfo.courseId} ${routerInfo.subjectName}`}]})
  }
}

const FailPrev=async (ID:String,userEmail:String,prevName:String,dependency:String,routerInfo:any)=>{
  const userResponse=await User.findOne({email:userEmail})
  const currentPrev=await userResponse.subject.find((cur:any)=>cur.name===`${routerInfo.courseId} ${routerInfo.subjectName}`).prevs.find((cur:any)=>cur.name===prevName)
  if(currentPrev.prevList.length>currentPrev.tryAmount.length){
    await User.findOneAndUpdate({email:userEmail},{$push:{"subject.$[subject].prevs.$[prevs].tryAmount":1}},{arrayFilters:[{"subject.name":`${routerInfo.courseId} ${routerInfo.subjectName}`},{"prevs.name":prevName}]})
  }else{
    if(currentPrev.tryAmount[currentPrev.prevList.length-1]>1){
      const prevNum:Number=currentPrev.prevList.length-1
      const greaterResponse=await User.updateOne({email:userEmail},{$set:{["subject.$[subject].prevs.$[prevs].tryAmount."+prevNum]:0}},{arrayFilters:[{"subject.name":`${routerInfo.courseId} ${routerInfo.subjectName}`},{"prevs.name":prevName}]})
    }else{
      const prevNum:Number=currentPrev.prevList.length-1

      const passinghere2=await User.updateOne({email:userEmail},{$inc:{["subject.$[subject].prevs.$[prevs].tryAmount."+prevNum]:1}},{arrayFilters:[{"subject.name":`${routerInfo.courseId} ${routerInfo.subjectName}`},{"prevs.name":prevName}]})
    }
  }
  // 
  if(dependency==='none'){
  }else{
    const response =await Prev.findOne({name:dependency})
    const response1=await User.updateOne({email:userEmail},{$push:{"subject.$[subject].prevs.$[prev].prevList":{$each: [ response._id ],$position: 0}}},{arrayFilters:[{"subject.name":`${routerInfo.courseId} ${routerInfo.subjectName}`},{"prev.name":prevName}]})
  }
}

const prevOrDone=(AnswerType:Boolean,Status:String[])=>{
  const string=Status.join('')
  if(!AnswerType &&(string==='-' || string==='-+' || string==='+-'))return true
  else if(AnswerType &&(string==='+' || string==='-+' ||string ==='+-'))return true
  else return false
}

const removeFromFalsePositive=async (res:any,userEmail:String,ID:String,answerType:Boolean,falsePositiveName:String,routerInfo:any)=>{
if(answerType){
    const response=await User.updateOne({email:userEmail},{$pull:{"subject.$[subject].falsePositives":{"falsePositiveDoc":ID }}},{arrayFilters:[{"subject.name":`${routerInfo.courseId} ${routerInfo.subjectName}`}]})
    res.status(200).json({msg:'falsePositive updated'})
}else{
  const response2=await User.updateOne({email:userEmail},{$pull:{"subject.$[subject].falsePositives":{"falsePositiveDoc":ID }}},{arrayFilters:[{"subject.name":`${routerInfo.courseId} ${routerInfo.subjectName}`}]})
  const response3=await Prev.findOne({name:falsePositiveName})
  const response4=await User.findOneAndUpdate({email:userEmail},{$push:{"subject.$[subject].prevs":{"name":response3.name,prevList:[response3._id]}}},{arrayFilters:[{"subject.name":`${routerInfo.courseId} ${routerInfo.subjectName}`}]})
  res.status(200).json({msg:'falsePositive updated'})
}} 

const getResponse=async(answerType:Boolean,userEmail:String,ID:String,routerInfo:any)=>{
  if(answerType){
    const response=await User.findOneAndUpdate({email:userEmail},{$push:{"subject.$[subject].falsePositives.$[falsePositive].status":'+'}},{arrayFilters:[{"subject.name":`${routerInfo.courseId} ${routerInfo.subjectName}`},{"falsePositive.falsePositiveDoc":ID}]})
    return response
  }
  else{
    const response=await User.findOneAndUpdate({email:userEmail},{$push:{"subject.$[subject].falsePositives.$[falsePositive].status":'-'}},{arrayFilters:[{"subject.name":`${routerInfo.courseId} ${routerInfo.subjectName}`},{"falsePositive.falsePositiveDoc":ID}]})
    return response
  }
}
interface ResponseData {
  error?: string;
  msg?: string ;
  [key: string]: any; 
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // validate if it is a POST
  if (req.method !== "POST") {
    return res
      .status(200)
      .json({ error: "This API call only accepts POST methods" });
  }
  await dbConnect(); 
  // create new User on MongoDB
  const {
    correctAnswer,
    // question,
    userEmail,
    typeID,
    questionType,
    dependency,
    routerInfo
   } = req.body;
  try {
      const ID=new mongoose.Types.ObjectId(typeID)
      if(questionType.type==='falsePositive'){
        const response=await getResponse(correctAnswer,userEmail,ID,routerInfo)
        const prev=prevOrDone(correctAnswer,response.subject[0].falsePositives.find((cur:any)=>ID.equals(cur.falsePositiveDoc)).status)
        prev?removeFromFalsePositive(res,userEmail,ID,correctAnswer,questionType.name,routerInfo) :correctAnswer?res.status(200).json({msg:'updated...right Answer'}):  res.status(200).json({msg:'updated...Wrong Answer'})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
      }else
      if(questionType.type==='prev'){
        correctAnswer?
        passPrev(typeID,userEmail,questionType.name,routerInfo):
        FailPrev(ID,userEmail,questionType.name,dependency,routerInfo)
        res.status(200).json({msg:'prev updated'})
      }else
      if(questionType.type==='current'){
        processCurrent(typeID,userEmail,questionType.name,correctAnswer,routerInfo)
        res.status(200).json({msg:"current updated"})
      }else
      if(questionType.type==='preTest'){
        processPretest(typeID,userEmail,questionType.name,correctAnswer,routerInfo)
        res.status(200).json({msg:"preTest updated"})
      }
      else{
        res.status(200).json({msg:'current updated'})
      }

  } catch (error) {
    console.log(error)
    res
      .status(200)
      .json({ error: "Did not find any detail for this user's email" });
  }
}