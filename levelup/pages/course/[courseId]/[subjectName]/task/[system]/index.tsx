import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Questions from "../../../../../../components/week/task/TaskQuestions"
import { getSession, useSession } from "next-auth/react"
import axios from "axios"

type IndexSearch={
  status:String[],
  falsePositives:any[]
}

const index = () => {
    const {data}=useSession()
    // const [email,setEmail]=useState('')
    const [prevs,setPrevs]=useState<any>([])
    const [currents,setCurrents]=useState<any>([])
    const [falsePositives,setFalsePositives]=useState<any>([])
    const [preTests,setPreTests]=useState<any>([])
    const [returnin,setReturnin]=useState<any>(false)
    // Routers
    const Routers=useRouter();
    const courseId=Routers.query.courseId
    const subjectName=Routers.query.subjectName
    const system=Routers.query.system
    // 
    const getFalsePositiveindex=(falsePositive:IndexSearch)=>{
      const index=falsePositive.status.length
      if(index>3 || index<0)return 0
      else
      return index-1
    }

    const getPrevIndex=(prev:any)=>{
      // console.log(prev,"1")
      const prevtrail= prev.tryAmount?prev.prevList.length>prev.tryAmount.length?0:prev.tryAmount[prev.prevList.length-1]
      :0
      return prevtrail
    }

  useEffect(()=>{
    if(!system && !subjectName && !courseId)return
    // if(data.user?.email)setEmail(data.user.email)
    // else return
    // if(!email)return
    console.log(returnin)
    if(prevs.length>0 || falsePositives.length>0 ||returnin)return
    axios.post('../../../../api/getUserTask',{system,subjectName,courseId}).then(({data})=>{
      setReturnin(true)
      // if(data.some((cur:any)=>cur.name==='falsePositive').array) setFalsePositives(data.find((cur:any)=>cur.name==='falsePositive').array)
      // if(data.some((cur:any)=>cur.name==='prev').array) setPrevs(data.find((cur:any)=>cur.name==='prev').array)
      // if(data.some((cur:any)=>cur.name==='current').array) setCurrents(data.find((cur:any)=>cur.name==='current').array)
      // if(data.some((cur:any)=>cur.name==='preTest').array) setPreTests(data.find((cur:any)=>cur.name==='preTest').array)
    })
  },[courseId,returnin])
    const Router=useRouter()
    // const {weekId}=Router.query
  return (
    <div> 
      {(data)?
          <div>
              {falsePositives.length===0 && prevs.length===0 && currents.length===0 && preTests.length===0 &&(
            <div>
              <div>Waiting for Past Papers</div>
            </div>
             )}
            {falsePositives.length>0 &&(
            <div>
              <div>falsePositive</div>
              <div>
                {falsePositives.map((falsePositive:any,index:number)=>{
                return(
                  <Questions  question={falsePositive.falsePositiveDoc.questions[getFalsePositiveindex(falsePositive)]}  key={index} userEmail={data.user?.email} typeID={falsePositive.falsePositiveDoc._id} questionType={{type:'falsePositive',name:falsePositive.falsePositiveDoc.name}} routerInfo={{subjectName,courseId}}/>
                  // <div>not loading falsePositive</div>
                )
                })}
              </div>
            </div>
        )}
        {prevs.length>0 &&(
              <div>
              <div>Prev</div>
              <div>
                {prevs.map((prev:any,index:number)=>{
                return(
                  <Questions  question={prev.prevList[0].questions[getPrevIndex(prev)]} key={index} userEmail={data.user?.email} questionType={{type:'prev',name:prev.name}} typeID={prev.prevList[0]._id} dependency={prev.prevList[0].questions[getPrevIndex(prev)].dependency} routerInfo={{subjectName,courseId}} />
                  // <div>not loading Prev</div>
                )})}
                </div>
              </div>
        )}
              {preTests.length>0 &&(
              <div>
              <div>PreTests</div>
              <div>
                {preTests.map((preTest:any,index:number)=>{
                return(
                  <Questions  question={preTest.questions} key={index} userEmail={data.user?.email} questionType={{type:'preTest',name:preTest.name}} typeID={preTest._id}   routerInfo={{subjectName,courseId}} dependency={preTest.dependency} />
                  // <div>not loading Prev</div>
                )})}
                </div>
              </div>
        )}
        {currents.length>0 &&(falsePositives.length+prevs.length<10)&&(
            <div>
            <div>Currents</div>
            <div>
              {currents.map((current:any,index:number)=>{
              return(
                <Questions  question={current} key={index} userEmail={data.user?.email} questionType={{type:'current',name:current.name} } typeID={current._id} routerInfo={{subjectName,courseId}}/>
                // <div>not loading falsePositive</div>
              )})}
            </div>
            </div>
        )}
      </div>
      :
      <div>loading</div>
      }
    </div>
  )
}

export default index

export const getServerSideProps=async(context:any)=>{
  const session=await getSession(context)
  if(!session)return {
      redirect:{
          destination:'/login'
      }
  }
  return {
      props:{session}
  }}