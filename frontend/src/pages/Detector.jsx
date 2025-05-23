import React from 'react'
import Header from '../components/Header'
import '../cssfiles/detector.css'
import Detectorcont from '../components/Detectorcont'
import Footer from '../components/Footer'

function Detector() {
  return (
    <div className='detect'>
        <Header/>
        <Detectorcont/>
        <Footer/>
    </div>
  )
}

export default Detector