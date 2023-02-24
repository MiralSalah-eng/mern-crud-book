import { useState } from 'react'
import {useAuthContext} from './useAuthContext'


const useLogin = () => {

    const [error , setError] = useState(null)
    const [loading , setLoading] = useState(false)
    const {dispatch} = useAuthContext()

    const login = async (email,password) => {
        setError(null)
        setLoading(true)

        const response = await fetch('https://mern-crud-book-api.onrender.com/api/users/login' , {
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
            setError(null)
            console.log(json);
            
            localStorage.setItem('user',JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            setLoading(false)

        }
    }

  return {login,loading,error}
}

export default useLogin