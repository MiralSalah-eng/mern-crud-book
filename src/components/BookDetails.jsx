import { useState } from "react"
import { useAuthContext } from "../Hook/useAuthContext"
import { UseBookContext } from "../Hook/useBookContext"

const BookDetails = ({book}) => {

  const [isEdit,setIsEdit] =useState(false)
  const [title,setTitle] =useState(book.title)
  const [author,setAuthor] =useState(book.author)
  const [description,setDescription] =useState(book.description)
  const [pages,setPages] =useState(book.pages)
  const id = book._id


  const { dispatch } = UseBookContext()
  const { user } = useAuthContext()

  const submitEdit = async (event) =>{
    event.preventDefault();

    if (!user) {
      return
    }

    const response = await fetch('https://mern-crud-book-api.onrender.com/api/books/'+id,{
      method: 'PATCH',
      body: JSON.stringify({author,title,description,pages}),
      headers: {
         'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        
       }
    })

    const json = await response.json()

    if (response.ok){
      console.log(json);
      dispatch({type: 'UPDATE_BOOK', payload: json})
      setIsEdit(false) 
      setTitle('')
      setAuthor('')
      setDescription('')
      setPages()   
    }
    
  } 

  // Delete Function 
  const handleDelete = async (event) => {
    event.preventDefault();

    const response = await fetch('https://mern-crud-book-api.onrender.com/api/books/'+ book._id, {
      method: 'DELETE',
      headers: {
         'Authorization': `Bearer ${user.token}`       
      }
      
    })
    const json = await response.json()
   if(response.ok) {
    dispatch({type:'DELETE_BOOK' , payload:json})
   }
  }

    return (
      <header>
        <div className="workout-details">
            <h4>Book Title : {book.title}</h4>
            <h5>Author : {book.author}</h5>
            <h5>Pages : {book.pages}</h5>
            <p>Description  : {book.description}</p>
            <div className="buttons">
            <span onClick={handleDelete}>Delete</span>
            {isEdit ?  <span onClick={() => setIsEdit(false)}>Cancel</span> : <span onClick={ () => setIsEdit(true) }>Edit Book</span>}
            </div>
            
            {isEdit&&
            <form onSubmit={submitEdit} className="create">
            <h3>Edit Book</h3>
    
            <label>Book Title</label>
            <input type="text" onChange={(e)=>{setTitle(e.target.value)}} value={title}/>
  
            <label>Book Author</label>
            <input type="text" onChange={(e)=>{setAuthor(e.target.value)}} value={author}/>
          
            <label>Book Description</label>
            <textarea onChange={(e)=>{setDescription(e.target.value)}} value={description}></textarea>
          
            <label>Book Pages</label>
            <input type="number" onChange={(e)=>{setPages(e.target.value)}} value={pages}/>

            <div className="editButtons">  
            <button>Update</button>
            <button onClick={() => setIsEdit(false)}>Cancel</button>
            </div>
         </form>

            }
        </div>
      </header>
    )
  }
  
  export default BookDetails