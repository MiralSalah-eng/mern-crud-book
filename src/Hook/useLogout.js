import {useAuthContext} from './useAuthContext'
import { UseBookContext } from "../Hook/useBookContext"

const useLogout = () => {

    const {dispatch} = useAuthContext()
    const {dispatch : bookDispatch } = UseBookContext()

    const logout = async () => {
      
        localStorage.removeItem('user')
        dispatch({type:'LOGOUT'})
        bookDispatch({type:'SET_BOOKS' , payload :null})

        }
    

  return {logout}
}

export default useLogout