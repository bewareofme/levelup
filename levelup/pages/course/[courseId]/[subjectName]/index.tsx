import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import WeeksComponent from "../../../../components/week/WeeksComponent"
import LectureName from "../../../../components/week/LectureName"
import axios from "axios"
import { getSession, useSession } from "next-auth/react"

const index = () => {
  const {data}=useSession()
  const [email,setEmail]=useState('')
  const [id,setId]=useState('')
  const [lectures,setLectures]=useState<any[]>([])
  useEffect(()=>{
    if(!data)return
    if(data.user?.email)setEmail(data.user.email)
    else return
    if(!email)return
    if(lectures.length>0)return
    axios.get('../../../api/getLectureName').then(({data})=>{
      setLectures(data)
    })
    axios.post('../../../api/getUserId',{email}).then(({data})=>{
      setId(data)
    })
  },[id,data,email])
  console.log(id)
  const Router=useRouter()
  const [weeks,setWeeks]=useState(['week1','week2','week3','week4'])
  const {courseId}=Router.query
  const {subjectName}=Router.query
  const [view,setView]=useState('week')
  const buttonHandler=()=>{
    setView((prevState)=>{
      if(prevState==='week')return 'notWeek'
      else return 'week'
    })
    console.log(view)
  }
  return (
    <div className="flex flex-col">
      {(view==='week' && weeks.length>0) && (
      <div>
        {id? (
          <div>
            {/* <WeeksComponent subjectName={subjectName} courseId={courseId}/> */}
            <Link href={`/course/${courseId}/${subjectName}/task/${id}`}>
                system
              </Link>
          </div>
        ):(
          <div>loading</div>
        )}
      </div>
      )}
      {view==='notWeek' &&(
        <div>
          {lectures.length>0?
          <div>
            {lectures.map((lecture,index)=>(
              <Link href={`/course/${courseId}/${subjectName}/lecture/${lecture._id}`} key={index}>
                <LectureName name={lecture.name}/>
              </Link>
            ))}
          </div>
          :
            <div>
              loading
            </div>
          }
        </div>
      )}
      <button onClick={buttonHandler}>setView</button>
    </div>
  )
}

export default index


