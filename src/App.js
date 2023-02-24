import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { useAuthContext } from './Hook/useAuthContext';


const toggleMode =()=>{
  const home = document.querySelector('body')
  home.classList.toggle('dark')
}



function App() {
  const { user } = useAuthContext()
  return (
    <BrowserRouter>
    
     <div className="App">
      <Navbar/>
      <div className="toggle" onClick={toggleMode}></div>
      <div className='pages'>

      <Routes>
        <Route path='/' element={ user ? <Home/> : <Navigate to='/login'/>}/>
        <Route path='/login' element={ !user ? <Login/> : <Navigate to='/'/>}/>
        <Route path='/signup' element={!user ? <Signup/> : <Navigate to='/'/>}/>
      </Routes>
      </div>
    </div>
    </BrowserRouter>
   
  );
}

export default App;
