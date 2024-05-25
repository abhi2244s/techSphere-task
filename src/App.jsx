import { useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Favorite from './components/Favorites/Favorite'
import Recently from './components/Recently/Recently'




function App() {

  return (
    <>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/favorite' element={<Favorite/>} />
        <Route path='/recently' element={<Recently/>} />
      </Routes>
    </>
  )
}

export default App
