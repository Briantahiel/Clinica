
import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Form from './components/Form'
import Login from './components/Login'

import { userContext } from './routes/userContext'

function App() {
  const [user, setUser] = useState(null);

  const handleChangeLogin = () => {
    if(user) {
      setUser(null);
    }else{
      setUser({
        name: 'Brian'
      })
    }
  }

  return (
    <userContext.Provider value={user}>
    <button onClick={handleChangeLogin}>Cambia Login</button>
      <BrowserRouter>
      {/* <RouterProvider router={routes}/> */}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/form' element={<Form />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  </userContext.Provider>
  )
}

export default App
