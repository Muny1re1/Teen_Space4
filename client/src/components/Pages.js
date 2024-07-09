import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landingpage from './Landingpage'
import MainPage from './MainPage'

function Pages() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Landingpage />} />
            <Route path='/main' element={<MainPage />} />
        </Routes>
    </div>
  )
}

export default Pages