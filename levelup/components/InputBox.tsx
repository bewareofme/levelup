import React from 'react'
type Props={
    setInputEvent:Function,
    title:String
}
const InputBox = ({setInputEvent,title}:Props) => {
  return (
    <div className='p-2 flex flex-col border-black border-[0.12rem]  hover:bg-gray-300/50 shrink-0' >
    <label  className='font-semibold text-sm text-gray-400 px-2'>{title}</label>
    <input className='px-2 py-1 rounded-2xl w-full my-1' type={title==='PASSWORD'?'password':'text'} onChange={(e)=>setInputEvent(e.target.value)}  />
</div>
  )
}

export default InputBox