import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className='p-4 h-screen flex item-center justify-content'>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
      </Routes>
    </div>
  )
}

export default App
