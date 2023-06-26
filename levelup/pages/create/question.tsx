import { getSession, useSession } from 'next-auth/react'
import React, { useState } from 'react'
import axios from 'axios'

const question = () => {
    const session=useSession({required:true})
    const [title,setTitle]=useState('')
    const [week,setWeek]=useState(0)
    const [subject,setSubject]=useState('')
    const [checkboxChoices,setcheckboxChoices]=useState<string[]>(['1','2','3','4'])
    const [methodAnswer,setMethodAnswer]=useState('')
    const [checkboxAnswer,setCheckboxAnswer]=useState('')
    const [video,setVideo]=useState('')
    const [dependency,setDependency]=useState('')
    const [name,setNames]=useState('')
    const [isFalsePositive,setIsFalsePositive]=useState(false)
    const [isPrev,setIsPrev]=useState(false)
    const [isPretest,setIsPreTest]=useState(false)
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!isFalsePositive && !isPrev &&(!isPretest && week===0) &&week===0){alert('set isfalse,isprev or put a week');return}
        const res=await axios.post('../api/createQuestion',{
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
            isFalsePositive,
            isPretest
        })
        console.log(res)
    }
  return (
    <div>
        <form action="" className='flex flex-col gap-2 m-2' onSubmit={handleSubmit}>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="">Subject</label>
                <input required className='p-2 border border-gray-400' type="text" onChange={(e)=>setSubject(e.target.value)} /></div>
                <div className=' flex flex-col gap-2'>
                <label htmlFor="">Week</label>
                <input  className='p-2 border border-gray-400' type="number" min='0' onChange={(e)=>setWeek(e.target.valueAsNumber)} /></div>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="">MethodAnswer</label>
                <input required type="text" className='p-2 border border-gray-400'onChange={(e)=>setMethodAnswer(e.target.value)} /></div>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="">CheckboxAnswer</label>
                <input required type="text" className='p-2 border border-gray-400' onChange={(e)=>setCheckboxAnswer(e.target.value)} placeholder='1,2,3,4' /></div>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="">video</label>
                <input required type="text" className='p-2 border border-gray-400' onChange={(e)=>setVideo(e.target.value)}/></div>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="">Dependency</label>
                <input required type="text" className='p-2 border border-gray-400' onChange={(e)=>setDependency(e.target.value)}/></div>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="">Name</label>
                <input required type="text" className='p-2 border border-gray-400' onChange={(e)=>setNames(e.target.value)}/></div>
                <div className=' flex flex-col gap-2'>isFalsePositive
                    <div className='flex'>
                    <label htmlFor="">True</label>
                    <input required type="radio" className='p-2 border border-gray-400' name='isFalsePositive' onClick={(e)=>setIsFalsePositive(true)}/>
                    <label htmlFor="">False</label>
                    <input required type="radio" className='p-2 border border-gray-400' name='isFalsePositive' onClick={(e)=>setIsFalsePositive(false)} defaultChecked/></div>
                </div>
                <div className=' flex flex-col gap-2'>isPrev?
                    <div className='flex'>
                    <label htmlFor="">True</label>
                    <input required type="radio" className='p-2 border border-gray-400' name='Prev' onClick={(e)=>setIsPrev(true)}/>
                    <label htmlFor="">False</label>
                    <input required type="radio" className='p-2 border border-gray-400' name='Prev' onClick={(e)=>setIsPrev(false)} defaultChecked/></div>
                </div>
                <div className=' flex flex-col gap-2'>isPreTest?
                    <div className='flex'>
                    <label htmlFor="">True</label>
                    <input required type="radio" className='p-2 border border-gray-400' name='PreTest' onClick={(e)=>setIsPreTest(true)}/>
                    <label htmlFor="">False</label>
                    <input required type="radio" className='p-2 border border-gray-400' name='PreTest' onClick={(e)=>setIsPreTest(false)} defaultChecked/></div>
                </div>
            <div className=' flex flex-col gap-2'>
                <label htmlFor="">Title</label>
                <input required type="text" className='p-2 border border-gray-400' onChange={(e)=>setTitle(e.target.value)} /></div>
                <div className=' flex flex-col gap-2 border border-red-400 p-2'>
                <label htmlFor="">CheckboxChoice1</label>
                <input required type="text" className='p-2 border border-gray-400'  onChange={(e)=>setcheckboxChoices(x=>{return x.map((val,index)=>{return index===0? e.target.value: val })})} />
                <label htmlFor="">CheckboxChoice2</label>
                <input required type="text" className='p-2 border border-gray-400'  onChange={(e)=>setcheckboxChoices(x=>{return x.map((val,index)=>{return index===1? e.target.value: val })})}/>
                <label htmlFor="">CheckboxChoice3</label>
                <input required type="text" className='p-2 border border-gray-400'  onChange={(e)=>setcheckboxChoices(x=>{return x.map((val,index)=>{return index===2? e.target.value: val })})}/>
                <label htmlFor="">CheckboxChoice4</label>
                <input required type="text" className='p-2 border border-gray-400'  onChange={(e)=>setcheckboxChoices(x=>{return x.map((val,index)=>{return index===3? e.target.value: val })})} /></div>
                <button type='submit'> Submit question</button>
        </form>
    </div>
  )
}

export default question

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