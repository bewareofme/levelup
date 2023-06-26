import React from 'react'
import Questions from '../task/TaskQuestions'
type Props={
    title:String,
    video:String,
    // question?:boolean,
}

const Lecture = ({title,video}:Props) => {
  return (
    <div>
        {/* Title */}
        <div>{title}</div>
        {/* Video */}
        <div>{video}</div>
    </div>
    
  )
}

export default Lecture