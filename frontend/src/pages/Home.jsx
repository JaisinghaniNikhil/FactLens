import React from 'react'
import Header from '../components/Header'
import '../cssfiles/home.css'
import Homecont from '../components/Homecont' 
import TopNews from '../components/TopNews'
import Detectorintro from '../components/Detectorintro'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className='index'>
        <Header/>
        <Homecont/>
        <TopNews/>
        <Detectorintro/>
        <Footer/>
    </div>
  )
}

export default Home