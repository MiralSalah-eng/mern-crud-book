import { useContext } from "react";
import { BookContext } from "../context/BookContext";

export const UseBookContext = () => {
    const context = useContext(BookContext)

    if(!context){
        throw Error ("There Is An Error")
    }

    return context
}

