// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";
const Question=require( '../../models/Question') 
const FalsePositive=require( '../../models/FalsePositive')
const Prev=require( '../../models/Prev')
const Lecture=require( '../../models/Lecture')
const Subject=require( '../../models/Subject')



interface ResponseData {
  error?: string;
  msg?: string;
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
    isPrev,
    week, 
    title,
    subject,
    checkboxChoices,
    methodAnswer,
    checkboxAnswer,
    video,
    dependency,
    name,
    isPretest,
    isFalsePositive } = req.body;

  // hash password
  // create new User on MongoDB
  if(isFalsePositive || isPrev || isPretest)
  {
    if(isFalsePositive && isPrev)res.status(200).json({msg:'cannot be both at the same time'})
    try {
    const response=await Question.create({
        isPretest,
        isPrev,
        week, 
        subject,
        title,
        name,
        dependency,
        video,
        checkboxAnswer,
        methodAnswer,
        isFalsePositive,
        checkBoxChoices:checkboxChoices
    })
    if(isFalsePositive){
      const FalsePositiveResponse=await FalsePositive.updateOne(
        { "subject" : subject,"name":name },{ $push: { "questions":response._id },$setOnInsert: {subject: subject,name:name,tryAmount:0,status:'',$push:{questions:response._id}}},{upsert:true} 
      )

      res.json(FalsePositiveResponse)
    }else if(isPrev){
      const lectureResponse=await Lecture.findOne({name,subject})
      const PrevResponse=await Prev.updateOne(
        { "subject" : subject,"name":name },{ $push: { "questions":response._id },$setOnInsert: {subject: subject,name:name,activity:false,completion:false,lecture:lectureResponse._id,$push:{questions:response._id}}},{upsert:true} 
      )

      res.json(PrevResponse)
      }else if(isPretest){
        const weekFindSubjectquestion=await Subject.findOne(
          { "name": subject,"levels.number":week})
          if(weekFindSubjectquestion){
           const preTestResponse=await Subject.findOneAndUpdate(
          { "name":subject},{$push: { "levels.$[level].pretest.questions":response._id}},{arrayFilters:[{"level.number":week}]}
          )
          res.json(preTestResponse)
          }
          else{
            const preTestResponse=await Subject.updateOne(
              { "name":subject},{$push: { "levels":{number:week,"pretest.questions":response._id}}},
            )
          res.json(preTestResponse)
          }
      }
    }
      catch (error) {
    res
      .status(200)
      .json({ error: "Question wasnt able to be created" });
  }}
  else{
    if(!week)res.status(200).json({ error: "week Question wassnt able to be created" });
    try {
      const response=await Question.create({
          isPretest,
          isPrev,
          week, 
          subject,
          title,
          name,
          dependency,
          video,
          checkboxAnswer,
          methodAnswer,
          isFalsePositive,
          checkBoxChoices:checkboxChoices
      });
      const weekFindSubjectquestion=await Subject.findOne(
        { "name": subject,"levels.number":week})
      if(weekFindSubjectquestion){
        const weekSubjectResponse=await Subject.updateOne(
          { "name":subject,"levels.number":week},{$push: { "levels.$.currents.questions":response._id}},
        )
      }else{
        const weekSubjectResponse=await Subject.updateOne(
          { "name":subject},{$push: { "levels":{number:week,"currents.questions":response._id}}},
        )
      }   
      res.json(response)
    } catch (error) {
      console.log(error)
      res
        .status(200)
        .json({ error: "User wassnt able to be created" });
    }
  }
}