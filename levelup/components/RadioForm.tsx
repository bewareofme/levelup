import React from 'react'
type Props={
    handleOnChange:React.ChangeEventHandler<HTMLInputElement>,
    answerState:boolean,
    formHandler:React.FormEventHandler<HTMLFormElement>
    checked:boolean,
    checkbox:String[],
    submitAnswerHandler:(event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> void
}

const RadioForm = ({handleOnChange,answerState,formHandler,checked,checkbox,submitAnswerHandler}:Props) => {
  return (
    <form className='flex gap-2 items-center' onSubmit={formHandler}>
    <input type="radio" value='1' name="gender" onChange={handleOnChange} disabled={answerState}/> {checkbox[0]}
    <input type="radio" value='2' name="gender" onChange={handleOnChange} disabled={answerState} /> {checkbox[1]}
    <input type="radio" value='3' name="gender" onChange={handleOnChange} disabled={answerState} /> {checkbox[2]}
    <input type="radio" value="4" name="gender" onChange={handleOnChange} disabled={answerState} /> {checkbox[3]}
    <input type="radio" value="5" name="gender" onChange={handleOnChange} disabled={answerState} /> Skip
    <button onClick={submitAnswerHandler} className='flex justify-center items-center px-3 py-2 bg-blue-400 border border-white' disabled={answerState || !checked}>Submit Answer</button>
  </form>
  )
}

export default RadioForm