// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";
const Subject=require( '../../models/Subject') 
const Lecture=require( '../../models/Lecture') 


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
    week,
    subject,
    video,
    name,
} = req.body;

  // hash password
  // create new User on MongoDB
  try {
    const response=await Lecture.create({
        week,
        subject,
        name,
        video,
    })
    const weekFindSubjectquestion=await Subject.findOne(
      { "name": subject,"levels.number":week})
    if(weekFindSubjectquestion){
      // const weekSubjectResponse=await Subject.updateOne(
      //   { "name":subject,"levels.number":week},{$push: { "levels.$.currents.lectures":response._id}},
      // )
    }else{
      // const weekSubjectResponse=await Subject.updateOne(
      //   { "name":subject},{$push: { "levels":{number:week,"currents.lectures":response._id}}},
      // )
    } 
    res.json(response)
  } catch (error) {
    res
      .status(200)
      .json({ error: "User wassnt able to be created" });
  }
}