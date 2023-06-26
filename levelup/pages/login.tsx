
import Link from 'next/link'
import LoginForm from '../components/login/LoginForm'
import LoginProviders from '../components/login/LoginProviders'



const login = () => {
  return (
    <div className='min-h-screen flex justify-center items-center '>
        <div className='space-y-2 shrink-0'>
        <p className='font-bold text-md'>Log in to your Levelup account</p>
        <LoginProviders/>
        <LoginForm/>
        <div>Don't have an account yet?
        <Link href='/register'>
            <div className='text-blue-500 hover:text-blue-500/75 underline'>Register now</div>
            </Link>
        </div>
        </div>
    </div>
  )
}

export default login