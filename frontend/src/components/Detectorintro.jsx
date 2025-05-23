import React from 'react'
import '../cssfiles/detectorintro.css'
import { useNavigate } from 'react-router-dom'

function Detectorintro() {
  const navigate = useNavigate()
  return (
    <div className='introduction'>
        <p>"In today's digital world, fake news spreads faster than ever. At FactLens, we empower you to verify whether the information you're reading is credible or misleading. Stay informed and make smarter decisions with trusted news. Our intelligent Fake News Detector analyzes content in real time to flag unreliable sources. Whether it's headlines, articles, or viral posts — we've got you covered. FactLens is your tool for truth in a world full of misinformation."</p>

        <button onClick={()=>navigate('/Detector')}>Try the Detector →</button>
    </div>
  )
}

export default Detectorintro