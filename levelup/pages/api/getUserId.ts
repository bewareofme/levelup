// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const User=require( '../../models/User')
const FalsePositive=require( '../../models/FalsePositive')
const Question=require( '../../models/Question')
const Prev=require( '../../models/Prev')
const Subject=require( '../../models/Subject')
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";



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
 email
} = req.body;
  // create new User on MongoDB
  try {
    const response=(await User.findOne({email}))
    // const subjectResponse=await Subject.findOne({name:response.subject[0].name}).populate('weeks.currents.questions')
    res.json(response._id)
  } catch (error) {
    console.log(error)
    res
      .status(200)
      .json({ error: "Did not find any detail for this user's email" });
  }
}