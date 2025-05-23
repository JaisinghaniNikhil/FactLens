import React from 'react'
import { FaPhone, FaEnvelope, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'
import '../cssfiles/footer.css'
import { useNavigate } from 'react-router-dom';


function Footer() {
    const navigate = useNavigate();
  return (
    <div className='footer' id='footer'>
        <div className='about'>
            <h3>FactLens</h3>
            <p>FactLens is a fake news detection platform aimed at promoting truthful journalism and media literacy. Our mission is to empower users to critically analyze the information they encounter online. With the rise of misinformation, FactLens provides a reliable way to verify the authenticity of news articles, helping you stay informed with facts, not fiction.</p>
        </div>
        <div className='quicklinks'>
            <h3>Quick Links</h3>
            <ul>
                <li onClick={()=>navigate('/')}>Home</li>
                <li onClick={()=>navigate('/Detector')}>Verify News</li>
                <li onClick={()=>navigate('/About')}>About</li>
                <li onClick={() => {
                    const section = document.getElementById('headlines');
                    if(section){
                        section.scrollIntoView({behavior : 'smooth'});
                    }
                }}>Headlines</li>
                <li onClick={() => {
                    const section = document.getElementById('footer');
                    if(section){
                        section.scrollIntoView({behavior:'smooth'});
                    }
                }}>Contact</li>
            </ul>
        </div>
        <div className='contact'>
            <h3>Contact Info</h3>
            <a className='contact-item' href='tel:8446560200'>
                <FaPhone /> <span>8446560200</span>
            </a>
            <a className='contact-item' href='mailto:nikhiljaisinghani30@gmail.com'>
                <FaEnvelope /> <span>nikhiljaisinghani30@gmail.com</span>
            </a>
        </div>

        <div className='follow'>
            <h3>Follow Us</h3>
            <a href='https://www.instagram.com/jaisinghani_nikhil_/'><FaInstagram/></a>
            <a href='https://github.com/JaisinghaniNikhil'><FaGithub/></a>
            <a href='https://www.linkedin.com/in/nikhil-jaisinghani-980514240/'><FaLinkedin/></a>
        </div>
    </div>
  )
}
export default Footer