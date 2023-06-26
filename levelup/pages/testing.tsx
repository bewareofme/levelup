import { getSession, useSession } from 'next-auth/react'
import React from 'react'

const testing = () => {
    const session=useSession({required:true})
  return (
    <div>testing</div>
  )
}

export default testing

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