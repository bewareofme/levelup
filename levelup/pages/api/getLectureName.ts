// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const Lecture=require( '../../models/Lecture') 
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
  if (req.method !== "GET") {
    return res
      .status(200)
      .json({ error: "This API call only accepts POST methods" });
  }
  await dbConnect(); 
  // create new User on MongoDB
  try {
    const response=await Lecture.find({})
    res.json(response)
  } catch (error) {
    console.log(error)
    res
      .status(200)
      .json({ error: "Did not find any detail for this user's email" });
  }
}