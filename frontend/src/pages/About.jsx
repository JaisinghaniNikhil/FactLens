import React from 'react'
import '../cssfiles/about.css'
import me from '../assets/me.png'
import { useNavigate } from 'react-router-dom'

function About() {
    const navigate = useNavigate();
  return (
    <div>
        <h2 id='abouth2'>About Me</h2>
            <div className='aboutme'>
                <img src={me} alt='Nikhil'/>
                <p>Hi, I’m Nikhil Jaisinghani, the creator of FactLens, a fake news detection platform built to promote truth and fight misinformation in the digital age.
                <br/>
                <br/>
                I’m a passionate full-stack developer with a strong background in web and mobile development. I created FactLens as part of my commitment to using technology for social good. The rise of misinformation online inspired me to build a tool that helps users quickly identify fake news using intelligent algorithms and user-friendly design.
                <br/>
                <br/>
                With skills in React.js, PHP, MYSQL, and other modern web technologies, I’ve crafted FactLens to be not only accurate but also accessible and easy to use. I believe that empowering people with the right tools is the first step toward a more informed society.
                <br/>
                <br/>
                When I’m not coding, I’m usually exploring the latest tech trends, working on personal projects, or learning new skills to keep improving my craft.
                <br/>
                
                Thank you for using FactLens — together, let’s make the internet a more trustworthy place.
                </p>
            </div>
            
        <button id='backbtn' onClick={()=> navigate('/')}>Back</button>
    </div>
  )
}

export default About