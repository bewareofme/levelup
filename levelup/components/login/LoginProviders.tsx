import {getProviders,signIn} from'next-auth/react'
import GoogleButton from 'react-google-button'

const LoginProviders = () => {
    const loginWithProviderGoogle=async()=>{
        const providers=await getProviders()
        signIn(providers?.google.id,{
            callbackUrl:process.env.VERCEL || 'http://localhost:3000'  
          })
    }
    const loginWithProviderFacebook=async()=>{
        const providers=await getProviders()
        signIn(providers?.facebook.id,{
            callbackUrl:process.env.VERCEL || 'http://localhost:3000'  
          })
    }
  return (
    <div className='flex flex-col space-y-2'>
    <GoogleButton onClick={loginWithProviderGoogle}  />
    <button className='border border-gray-400 p-2 h-[50px]' onClick={loginWithProviderFacebook}>Sign in with Facebook</button>
</div>
  )
}

export default LoginProviders