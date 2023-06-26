import { getSession, useSession } from 'next-auth/react'
import React, { useState } from 'react'

const subject = () => {
    const session=useSession({required:true})
    const [questions,setQuestions]=useState([])
    const [falsePositives,setFalsePositives]=useState([])
    const [prevs,setPrevs]=useState([])
    const [weeks,setWeeks]=useState([])
    const [name,setNames]=useState('')
  return (
    <div>subject</div>
  )
}

export default subject

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