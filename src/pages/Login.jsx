import React from 'react'
import { useState } from 'react'
import useLogin from '../Hook/useLogin'

export const Login = () => {
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const  {login,loading,error} = useLogin()


    const handleForm = async (e) => {
        e.preventDefault()
        await login(email,password)
    }
  return (
    <form className='login' onSubmit={handleForm}>
        <h3>Login</h3>
    {loading ? <h3>Loading ...</h3> : (
      <>
       <label>Email address:</label>
        <input value={email} type='email' placeholder='Enter your email' 
        onChange={(e)=>setEmail(e.target.value)}/>

        <label>Password:</label>
        <input value={password} type='password' placeholder='Enter your Password' 
        onChange={(e)=>setPassword(e.target.value)}/>

        <button disabled={loading}>Login</button>
        {error && <div className='error'>{error}</div>}
      </>
    )}
       
    </form>
  )
}
