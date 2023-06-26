import Link from 'next/link'
import { useState } from 'react'
type Props={
    subjectName:string | string[] | undefined,
    courseId:string | string[] | undefined,
    week:String
}

const WeeksComponent = ({subjectName,courseId,week}:Props) => {
    const [active,setActive]=useState(false)
  return (
    <div>
    <div className="cursor-pointer bg-red-400 h-20 p-2 border border-gray-400 w-full" onClick={()=>setActive((!active))}>{week}</div>
      {active && (
      <div className="flex gap-4">
        <Link href={`/course/${courseId}/${subjectName}/task/${week}`}>
        <div>Task</div>
        </Link>
      </div>
        )}
  </div>
  )
}

export default WeeksComponent