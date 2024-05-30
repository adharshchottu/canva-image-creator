import { useState } from 'react'
import Navbar from './components/Navbar'
import './index.css'
import Canvas from './components/Canvas'

function App() {

  return (
    <>
    <Navbar page="glossary"/>
    <Canvas />
    </>
  )
}

export default App
