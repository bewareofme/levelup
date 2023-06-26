import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    course:String,
    subject:String,
    subjectName:String,
    colorFrom:String,
    colorTo:String,
    source:any
}

const Card = ({course,subject,subjectName,colorFrom,colorTo,source}: Props) => {
  return (
    <Link href={`/course/${course}/${subject}`} className='border-gray-400 border h-60 text-center min-w-[50%] max-w-[50%]  justify-self-center rounded-lg flex flex-col'>
        <div className={`flex-1 bg-gradient-to-t ${colorFrom} ${colorTo} flex flex-col rounded-lg`} >
          <div className='flex-1 relative top-6 text-2xl wrap font-bold p-2'>{subjectName}</div>
          <div className=' flex-1 justify-center items-end flex'>
          <Image src={source} alt={'Card photo'} className=' w-[70px] h-[70px] justify-self-center object-fill relative bottom-6'/>
          </div>
          </div>
  </Link>
  )
}
export default Card
// from-${colorFrom} to-${colorTo}`}