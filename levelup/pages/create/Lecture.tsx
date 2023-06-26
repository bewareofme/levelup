import axios from 'axios'
import { getSession, useSession } from 'next-auth/react'
import React, { useState } from 'react'

const Lecture = () => {
    const session=useSession({required:true})
    const [subject,setSubject]=useState('')
    const [week,setWeek]=useState(0)
    const [video,setVideo]=useState('')
    const [name,setNames]=useState('')
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(week===0){console.log('returntest');return}
        const res=await axios.post('../api/createLecture',{
            week,
            subject,
            video,
            name,
        })
        console.log(week)
    }
  return (
    <div>
                 <form action="" className='flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="">Subject</label>
                <input required className='p-2 border border-gray-400' type="text" onChange={(e)=>setSubject(e.target.value)} /></div>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="">Name</label>
                <input required type="text" className='p-2 border border-gray-400' onChange={(e)=>setNames(e.target.value)}/></div>
                <div className=' flex flex-col gap-2'>
                <label htmlFor="">Week</label>
                <input  type="number" className='p-2 border border-gray-400' min='0' onChange={(e)=>setWeek(e.target.valueAsNumber)}/></div>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="">Video</label>
                <input required type="text" className='p-2 border border-gray-400' onChange={(e)=>setVideo(e.target.value)} /></div>
                <button type='submit'> Submit Lecture</button>
        </form>
    </div>
  )
}

export default Lecture

export const getServerSideProps=async(context:any)=>{
    const session=await getSession(context)
    if(!session)return {
        redirect:{
            destination:'/login'
        }
    }
    return {
        props:{session}
    }
}