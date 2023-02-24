import React from 'react'
import { useState } from 'react'
import useSignup from '../Hook/useSignup'

export const Signup = () => {
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const  {signup,loading,error} = useSignup()

    const handleForm = async (e) => {
        e.preventDefault()
        await signup(email,password)

    }
  return (
    <form className='signup' onSubmit={handleForm}>
        <h3>Sign up</h3>

        {loading ? <h3>Loading ...</h3> : (<>
        <label>Email address:</label>
        <input value={email} type='text' placeholder='Enter your email' 
        onChange={(e)=>setEmail(e.target.value)}/>

        <label>Password:</label>
        <input value={password} type='password' placeholder='Enter your Password' 
        onChange={(e)=>setPassword(e.target.value)}/>

        <button disabled={loading}>Sign up</button>
        {error && <div className='error'>{error}</div>}
        </>)}
    </form>
  )
}
