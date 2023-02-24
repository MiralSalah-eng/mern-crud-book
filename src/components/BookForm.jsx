import { useState } from "react"
import { useAuthContext } from "../Hook/useAuthContext"
import { UseBookContext } from "../Hook/useBookContext"


const BookForm = () => {

     const {dispatch} = UseBookContext()
     const { user } = useAuthContext()

     const [title,setTitle] = useState('')
     const [author,setAuthor] = useState('')
     const [description,setDescription] = useState('')
     const [pages,setPages] = useState()
     const [error, setError] = useState({})


     const handleform = async (e) =>{
      e.preventDefault();

      if (!user) {
         setError('You must be logged in')
         return
       }

      const book = {title,author,description,pages}

      const response = await fetch('https://mern-crud-book-api.onrender.com/api/books/',{
         method: 'POST',
         body: JSON.stringify(book),
         headers: {
            'Content-Type': 'application/json',
           'Authorization': `Baerer ${user.token}`

          }
       })
       const json = await response.json()
       if(!response.ok){
         const rsponseError = await json.errors
         setError(rsponseError)

      }

       if (response.ok){
         setError(null)
         setTitle('')
         setAuthor('')
         setDescription('')
         setPages('')
         dispatch({type: 'CREATE_BOOK', payload: json})
         
       }
   }
    return (
     <form onSubmit={handleform} className="create sideForm">
        <h3>Add New Book</h3>

        <label>Book Title</label>
        <input type="text" onChange={(e)=>{setTitle(e.target.value)}} value={title}/>
               {error &&<div className="error">{error.title}</div>}


        <label>Book Author</label>
        <input type="text" onChange={(e)=>{setAuthor(e.target.value)}} value={author}/>
        {error &&<div className="error">{error.author}</div>}


        <label>Book Description</label>
        <input type="text" onChange={(e)=>{setDescription(e.target.value)}}  value={description}/>
        {error &&<div className="error">{error.description}</div>}

        

        <label>Book Pages</label>
        <input type="number" onChange={(e)=>{setPages(e.target.value)}} value={pages}/>
        {error &&<div className="error">{error.pages}</div>}


        <button>Add Book</button>
     </form>
    )
  }
  
  export default BookForm