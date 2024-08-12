import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AddProduct from './Components/AddProduct/AddProduct'
import ListProduct from './Components/ListProduct/ListProduct'
import Golive from './Components/GoLive/Golive'
import Login from './Pages/Login'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin'
import Appointment from './Components/Appointment/Appointment'


const App = () => {
  return (

    <>

      <Navbar />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/admin' element={<Admin />}> </Route>
        <Route path='/addproduct' element={<AddProduct />}></Route>
        <Route path='/listproduct' element={<ListProduct />}></Route>
        <Route path='/live' element={<Golive />}></Route>
        <Route path='/createappointment' element={<Appointment />}></Route>

      </Routes>

    </>
  )
}

export default App