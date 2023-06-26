import Link from 'next/link'
import {signOut, useSession} from 'next-auth/react'
import logopic from "../public/Asset_5Lv_logo.png"
import Image from 'next/image'


const Header = () => {
  const session=useSession()
  // console.log(logopic?"true":"false")
  return (
    <div className='border-red-400 bg-blue-200 flex justify-between py-2 px-3'>
      <Link href='/'>
        <Image src={logopic} alt='logo' width={100} height={100}/>
      </Link>
        {session.status==='unauthenticated' &&(
          <div className='flex gap-2'>
            <Link href='/login'>
            <div className='flex justify-center items-center px-3 py-2 hover:bg-gray-100 border-black border-[0.12rem] bg-white text-black'>Login</div>
            </Link>
            <Link href='/register'>
            <div className='flex justify-center items-center px-3 py-2  border-[0.12rem] bg-black text-white'>Sign up</div>
            </Link>
          </div>
          )}
          {session.status==='authenticated' &&(
            <div className='flex items-center gap-2'>
                <div className=''>{session?.data?.user?.name}</div>
                <button onClick={()=>signOut({ callbackUrl: 'http://localhost:3000/login' })} className='border border-gray-400 rounded-2xl p-2'>Sign out</button>
            </div>
          )}
    </div>
  )
} 

export default Header