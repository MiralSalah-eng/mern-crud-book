import { Link } from "react-router-dom"
import useLogout from "../Hook/useLogout"
import { useAuthContext } from "../Hook/useAuthContext"

const Navbar = () => {

  const { logout } = useLogout()
  const {user} = useAuthContext()

  const handleLogout = async (e) =>{
      e.preventDefault()
      await logout()
  }

    return (
      <header className="nav">
        <div className="container">
        <Link to="/">
          <h1>Book Love</h1>
        </Link>
        <nav>
            <div>
              {user && (
               <>
                <span>{user.email}</span>
              <button onClick={handleLogout}>Log out</button>
               </>
              )}
            </div>
          
        {!user && 
        (
          <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
        )
        }
        
        </nav>
        </div>
      </header>
    )
  }
  
  export default Navbar