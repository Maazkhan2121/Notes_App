
import './App.css';
import Navbar from './componenets/Navbar';
import About from './componenets/About';
import Home from './componenets/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Notestate from './context/notes/Notestate';
import Login from './componenets/Login';
import Signup from './componenets/Signup';
import { useState } from 'react';
import Alert from './componenets/Alert';

 function App() {

  const [alert, setAlert] = useState('null')
 
  const showAlert = (message, type) => {

    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert()
    }, 1500);
  }
  return (
    <>

      <Notestate>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          {/* Router for Home or About componenet */}
          <div className="container">
            <Routes>
              <Route path='/' element={<Home  showAlert={showAlert}/>}></Route>
              <Route path='/about' element={<About />}></Route>
              <Route path='/login' element={<Login showAlert={showAlert}/>}></Route>
              <Route path='/signup' element={<Signup showAlert={showAlert}/>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </Notestate>
    </>
  )
}

export default App;
