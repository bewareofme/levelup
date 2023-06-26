import { useRouter } from "next/router"
import Lecture from "../../../../../../components/week/lecture/Lecture"
import Questions from "../../../../../../components/week/task/TaskQuestions"
import { useEffect, useState } from "react"
import axios from "axios"

const index = () => {
  const [lecture,setLecture]=useState<any>('')
  const Router=useRouter()
  const {lectureName}=Router.query
  useEffect(()=>{
    if(!lectureName || lecture)return
    axios.post('../../../../api/getLectureNameData',{lectureName}).then(({data})=>{
      setLecture(data)
    })
  },[lectureName])

  return (
    <div>
      {lecture?
      <div className="m-2 p-2 border border-red-400 ">
        <Lecture title={lecture.name} video={lecture.video}/>
      </div>:
      <div>
        loading
      </div>
      }
    </div>
  )
}

export default index