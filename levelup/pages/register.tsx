import axios from 'axios'
import React, { useState } from 'react'
import Router from 'next/router'
import InputBox from '../components/InputBox'
import Link from 'next/link'
const register = () => {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const redirectLogin=()=>{
    const {pathname}=Router;
    if(pathname==='/register')Router.push('/login')
}

  const registerUser=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    // 
    const res=await axios.post('/api/register',{
      name,
      email,
      password
    },{
      headers:{
        Accept:"application/json",
        "Content-Type":'application/json',
      }
    }).then(()=>{
      redirectLogin()
    }).catch((error)=>console.log(error))
  }
  return (
    <div className='min-h-screen flex justify-center items-center'>
    <div className='flex  flex-col p-2 space-y-2'>
      <div className='font-semibold text-md'>Register and Start learning</div>
      <form className='space-y-2' onSubmit={registerUser}>
        <InputBox title='USERNAME' setInputEvent={setName}/>
        <InputBox title='EMAIL' setInputEvent={setEmail}/>
        <InputBox title='PASSWORD' setInputEvent={setPassword}/>
          <button className='border rounded-3xl border-gray-400 p-2 w-full bg-orange-400 hover:bg-orange-500'>Register</button>
      </form>
      <div className='flex gap-1'>Already have an account?
      <Link href='/login'>
            <div className='text-blue-500 hover:text-blue-500/75 underline'>Login</div>
            </Link>
            now
        </div>
    </div>
</div>
  )
}

export default register