import React from 'react'
type Props={
  answer:String,
  working:String,
  video:String,
}

const TaskAnswer = ({answer,working,video}:Props) => {
  return (
    <div className='flex flex-col gap-2 px-2 py-4 border border-red-400 my-2'>
      {/* Answer */}
      <div>{answer}</div>
      {/* Workings */}
      <div>{working}</div>
      {/* video */}
      <div>{video}</div>
    </div>
  )
}

export default TaskAnswer