import { useRouter } from "next/router"

const index = () => {
  const Router=useRouter()
  const coursename=Router.query.courseId
  console.log(coursename)
  return (
    <div>
      This is {coursename}
    </div>
  )
}

export default index