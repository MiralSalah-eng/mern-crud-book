import { useState } from 'react'
import {useAuthContext} from './useAuthContext'


const useSignup = () => {

    const [error , setError] = useState(null)
    const [loading , setLoading] = useState(false)
    const {dispatch} = useAuthContext()

    const signup = async (email,password) => {
        setError(null)
        setLoading(true)

        const response = await fetch('https://mern-crud-book-api.onrender.com/api/users/signup' , {
            method :'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({email,password})
        })

        const json = await response.json()

        if (!response.ok) {
            setLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            setLoading(false)
            setError(null)

            localStorage.setItem('user',JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})

        }
    }

  return {signup,loading,error}
}

export default useSignup