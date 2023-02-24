import { useContext } from "react";
import { AuthContext } from "../context/UserContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw Error ("There Is An Error")
    }

    return context
}

