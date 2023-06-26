
import Router from 'next/router'
import Link from 'next/link'
import React, { useState } from 'react'
import {useSession,signIn} from'next-auth/react'
import InputBox from '../InputBox'

const LoginForm = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const redirectHome=()=>{
        const {pathname}=Router;
        if(pathname==='/login')Router.push('/')
    }
    const loginUser=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const res:any=await signIn('credentials',{
            email:email,
            password:password,
            redirect:false,
            callbackUrl: 'http://localhost:3000/'
        })
        res?.error?console.log(res.error):redirectHome()
    }
    const setInputFocus=(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        
    }
  return (
    <form className='flex  flex-col  space-y-2' onSubmit={loginUser}>
            <InputBox title='EMAIL' setInputEvent={setEmail}/>
            <InputBox title='PASSWORD' setInputEvent={setPassword}/>
            <button className='border rounded-3xl border-gray-400 p-2  bg-orange-400 hover:bg-orange-500'>Login</button>
        </form>
  )
}

export default LoginForm