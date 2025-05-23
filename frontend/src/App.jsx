import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Detector from './pages/Detector'
import About from './pages/About'
import { UserProvider } from './hooks/UserContext'

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Detector' element={<Detector />} />
          <Route path='/About' element={<About/>} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
