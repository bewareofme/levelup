import React, { useState } from 'react'
import RadioForm from '../../RadioForm'
import TaskAnswer from './TaskAnswers'
import axios from 'axios'
type Props={
  routerInfo:{
    courseId:string | string[] | undefined,
    subjectName:string | string[] | undefined
  }
  question:{
    _id:String
    title:String,
    checkboxAnswer:String
    methodAnswer:String,
    video:String,
    checkBoxChoices:String [],
  }
  userEmail:string|undefined| null,
  typeID?:String,
  questionType:{
    type:String,
    name:String
  },
  dependency?:String
}
const Questions = ({question,userEmail,typeID,questionType,dependency,routerInfo}:Props) => {
  const [checked,setChecked]=useState(false)
  const [currentAnswer,setCurrentAnswer]=useState('')
  const [showAnswer,setShowAnswer]=useState(false)
  const [answerState,setAnswerState]=useState(false)
  const formHandler =(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setAnswerState(true)
  }
  const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setCurrentAnswer(e.target.value)
    setChecked(true)
  }
  const submitAnswerHandler=async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
  const correctAnswer=currentAnswer===question.checkboxAnswer?true:false
  // question
  const response=await axios.post('../../../../../api/processTaskAnswer',{correctAnswer,userEmail,typeID,questionType,dependency,routerInfo})
}
  return (
    <div className={`flex flex-col gap-2 border border-gray-400 m-2 w-full ${answerState?(answerState && currentAnswer===question.checkboxAnswer)?'bg-green-400':'bg-red-400':''} p-2`}>
        {/* Question */}
        <div>
        {question.title}
        </div>
        {/* checkbox */}
        <RadioForm  submitAnswerHandler={submitAnswerHandler} handleOnChange={handleOnChange} formHandler={formHandler} answerState={answerState} checked={checked} checkbox={question.checkBoxChoices
}/>
        {/* answer button */}
        <div className='flex justify-center'>
          {answerState && (
        <button onClick={()=>setShowAnswer(()=>!showAnswer)} className='flex justify-center items-center bg-red-200 border-1 border-blue-200 rounded-2xl px-3 py-2 w-[20%]'>Show answer</button>
          )}
        </div>
        {showAnswer && (
        <TaskAnswer answer={question.checkBoxChoices[Number(question.checkboxAnswer)-1]} working={question.methodAnswer} video={question.video}/>
        )}
    </div>
  )
}

export default Questions