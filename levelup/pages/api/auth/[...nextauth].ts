import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../utils/mongodb"
import dbConnect from "../../../utils/dbConnect";
const User=require( '../../../models/User') 
import { compare } from "bcrypt";

export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!
        }),
        FacebookProvider({
            clientId:process.env.FACEBOOK_CLIENT_ID!,
            clientSecret:process.env.FACEBOOK_CLIENT_SECRET!
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
              email: {
                label: "Email",
                type: "text",
              },
              password: {
                label: "Password",
                type: "password",
              },
            },
            async authorize(credentials) {
              await dbConnect();
      
              // Find user with the email
              const user = await User.findOne({
                email: credentials?.email,
              });
      
              // Email Not found
              if (!user) {
                throw new Error("Email is not registered");
              }
      
              // Check hased password with DB hashed password
              const isPasswordCorrect = await compare(
                credentials!.password,
                user.hashedPassword
              );
      
              // Incorrect password
              if (!isPasswordCorrect) {
                throw new Error("Password is incorrect");
              }
      
              return user;
            },
          }),
    ],

    pages:{
        signIn:'/login',
    },
    session:{strategy:'jwt'},
    jwt:{
        secret:process.env.JWT_SECRET!,
    },
    secret:process.env.AUTH_SECRET!
})