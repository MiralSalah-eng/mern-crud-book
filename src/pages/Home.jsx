import { useEffect } from "react"
import BookDetails from "../components/BookDetails"
import BookForm from "../components/BookForm"
import { useAuthContext } from "../Hook/useAuthContext"
import { UseBookContext } from "../Hook/useBookContext"

const Home = () => {
    const {books,dispatch} = UseBookContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchBooks = async () => {
          const response = await fetch('https://mern-crud-book-api.onrender.com/api/books',{
            headers: {'Authorization': `Baerer ${user.token}`}
            
          }

          )
          const json = await response.json()
    
          if (response.ok) {
            dispatch({type: 'SET_BOOKS', payload: json})
          }
        }
        if (user) {
          fetchBooks()
        }
      }, [dispatch, user])
      return (
        <div className="home">
          <div className="workouts">
          {books && books.map( book =>(
            <BookDetails key={book._id} book={book}/>
          ))}
          {!books && <h1>No Book</h1>}
          </div>
          <BookForm/>
        </div>
      )
  }
  
  export default Home