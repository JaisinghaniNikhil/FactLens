import React from 'react'
import '../cssfiles/homecont.css'
import np from '../assets/np1.jpeg'
import np2 from '../assets/np2.jpeg'


export default function Homecont() {
  return (
    <div className='container'>
        <div className='imgs'>
            <img src={np} alt='visual' id='img1'/>
            <img src={np2} alt='visual2' id='img2'/>
        </div>
        <div className='dtext'>
            <h2>See Through the Lies.<br/><span className="animated-text">Focus with FactLens.</span></h2>
            <label>FactLens is your intelligent companion for navigating today’s overwhelming news cycle. Powered by cutting-edge detection logic and designed with a sleek interface, FactLens helps you identify misinformation in seconds.

            Paste a headline or news except, and let FactLens reveal its trust score — highlighting what’s verified and what might be deceptive.</label>
        </div>
    </div>
  )
}