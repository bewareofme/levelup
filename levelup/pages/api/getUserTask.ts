// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const User=require( '../../models/User')
const FalsePositive=require( '../../models/FalsePositive')
const Question=require( '../../models/Question')
const Prev=require( '../../models/Prev')
const Subject=require( '../../models/Subject')
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";


const getCurrentData=async (system:String,courseId:String,subjectName:String,fromPretest:Boolean)=>{
  const response=(await User.findOne({_id:system}).populate([
    {
      path: 'subject.falsePositives.falsePositiveDoc',
      populate: { path: 'questions' }
    },
    {
      path: 'subject.prevs.prevList',
      populate: { path: 'questions' }
    },
    {
      path: 'subject.currents.questions',
      // populate: {path:'questions'},
    }
    ]))
    const currentArraylength=response.subject.find((cur:any)=>cur.name===`${courseId} ${subjectName}`).currents.questions.length
    if(response.subject.find((cur:any)=>cur.name===`${courseId} ${subjectName}`).currents.questions.length===0){
      const response1=await Subject.findOne({name:subjectName})
      const userLevel=response.subject.find((cur:any)=>cur.name===`${courseId} ${subjectName}`).userLevel
      if(fromPretest){
        console.log('passinghere1')
        const updateUserCurrentFromPretest=await User.findOneAndUpdate({_id:system},{$push:{"subject.$[subjectName]":{"currents.questions":{$each:response1.levels[userLevel-1].currents.questions}}}},{arrayFilters:[{"subjectName.name":`${courseId} ${subjectName}`}]})
        console.log('passinghere11')
        return [{name:'falsePositive',array:response.subject.find((cur:any)=>cur.name===`${courseId} ${subjectName}`).falsePositives},{name:'prev',array:response.subject.find((cur:any)=>cur.name===`${courseId} ${subjectName}`).prevs},{name:'current',array:updateUserCurrentFromPretest.subject.find((cur:any)=>cur.name===`${courseId} ${subjectName}`).currents.questions}]
      }else{
        if(response1.levels.some((cur:any)=>cur.value===userLevel+1)){
          console.log('passinghere2')
          const updateUserCurrentFromCurrent=await User.findOneAndUpdate({_id:system},{$push:{"subject.$[subjectName]":{"currents.questions":{$each:response1.levels[userLevel].currents.questions}}}},{arrayFilters:[{"subjectName.name":`${courseId} ${subjectName}`}]})
          console.log('passinghere21')
          return [{name:'falsePositive',array:response.subject.find((cur:any)=>cur.name===`${courseId} ${subjectName}`).falsePositives},{name:'prev',array:response.subject.find((cur:any)=>cur.name===`${courseId} ${subjectName}`).prevs},{name:'current',array:updateUserCurrentFromCurrent.subject.find((cur:any)=>cur.name===`${courseId} ${subjectName}`).currents.questions}]
        }
      }
    }
    console.log('passinghere3')
    return [{name:'falsePositive',array:response.subject.find((cur:any)=>cur.name===`${courseId} ${subjectName}`).falsePositives},{name:'prev',array:response.subject.find((cur:any)=>cur.name===`${courseId} ${subjectName}`).prevs},{name:'current',array:response.subject.find((cur:any)=>cur.name===`${courseId} ${subjectName}`).currents.questions}]
}


const getPretestData=async (system:String,subjectName:String,courseId:String)=>{
const getUser=await User.findOne({_id:system})
const userLevel=getUser.subject.find((cur:any)=>cur.name===`${courseId} ${subjectName}`).userLevel
const getSubject=await Subject.findOne({name:`${courseId} ${subjectName}`}).populate([
  {
    path: 'levels.pretest.questions',
  }])

const mainLevel=getSubject.mainLevel
const levelDif=mainLevel-userLevel
let responseArray:any=[{name:'preTest',array:[]}]
for(let x=1;x<=levelDif;x++){
  let array=[]
   array=getSubject.levels[mainLevel-x].pretest.questions
   responseArray.find((cur:any)=>cur.name==='preTest')?.array.push(...array)
 }
 const trueArray=responseArray.filter((item:any)=>getUser.subject.find((cur:any)=>cur.name===`${courseId} ${subjectName}`).preTestCheck.includes(item._id))
 if(trueArray.length===0){
  // console.log('passinghere3')
   const updateUserPreTest=await User.findOneAndUpdate({_id:system,"subject.name":`${courseId} ${subjectName}`},{$push:{"subject":{preTestCheck:[],userLevel:mainLevel,"currents.questions":getSubject.levels[mainLevel-1].currents.questions}}})
  //  console.log('passinghere4')
   return getCurrentData(system,courseId,subjectName,true)
 }
 return trueArray
}


const checkPretest=async (system:String,courseId:Number,subjectName:String)=>{
  const response=await User.findOne({_id:system})
  // console.log(response,'checking response')
  // const foundSubject=response.subject.some((cur:any)=>cur.name===`${courseId} ${subjectName}`)
  // console.log(foundSubject)
  // if(foundSubject){
    const response1=await Subject.findOne({name:`${courseId} ${subjectName}`})
    const userLevel=response.subject.find((cur:any)=>cur.name===`${courseId} ${subjectName}`).userLevel
    if(response1.mainLevel>userLevel){
        return true
    }else{
      return false
    }
//  }
//  else{
//   // console.log('passingHERE,CheckPretest,true,1,DidntFindAnySubject')
//   const response2=await User.updateOne({_id:system},{$push:{subject:{name:`${courseId} ${subjectName}`,userLevel:1,preTestCheck:[]}}},{returnOriginal:false})
//   console.log(response2,'after update')
//   return true
//  }
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
  // get and validate body variables
  const {
    system,
    courseId,
    subjectName
} = req.body;
  // create new User on MongoDB
  try {
    // const subjectResponse=await Subject.findOne({name:response.subject[0].name}).populate('weeks.currents.questions')
    const responseArray=await checkPretest(system,courseId,subjectName)?await getPretestData(system,subjectName,courseId):await getCurrentData(system,courseId,subjectName,false)
    console.log(responseArray)
    res.status(200).json({msg:'tester'})
  } catch (error) {
    console.log(error)
    res
      .status(200)
      .json({ error: "Did not find any detail for this user's email" });
  }
}