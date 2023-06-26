type Props={
name:String,
}

const LectureName = ({name}:Props) => {
  return (
    <div className="border w-full flex border-red-400 m-2 px-4 py-2">
      <div className="font-bold text-2xl text-blue-600">{name}</div>
    </div>
  )
}

export default LectureName