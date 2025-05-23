import React, { useState } from 'react'
import Header from '../components/Header'
import '../cssfiles/login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Signup() {
  const [ name,setName ] = useState('');
  const [ uname,setUname ] = useState('');
  const [ pass,setPass ] = useState('');
  const [ unameError,setUnameError ] = useState('');
  const [ passError, setPassError ] = useState('');

  const navigate = useNavigate();

  const validateSignup = async () => {
  setUnameError('');
  setPassError('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (name === '' || uname === '' || pass === '') {
    alert('Please Fill All the Fields');
    return;
  } else if (!emailRegex.test(uname)) {
    setUnameError('Invalid Email Format');
    return;
  } else if (pass.length < 6) {
    setPassError('Password Length is less than 6');
    return;
  }

  try {
    const res = await axios.post('http://localhost/factlens-backend/signup.php', {
      name: name,
      email: uname,
      password: pass,
    });

    console.log('Server Response:', res.data); // DEBUG LINE

    if (res.data.message === 'User Registered Succesfully') {
      alert('Signup Successful');
      navigate('/Login');
    } else if (res.data.error) {
      alert(res.data.error);
    } else {
      alert('Unexpected Server Error');
    }
  } catch (err) {
    console.error('Signup Error:', err);
    alert('An Error occurred while Signup');
  }
};

  return (
    <div className='login1'>
        <Header/>
        <div className='form'>
            <h3>Signup</h3>
            <input type='text' 
                   id='name' 
                   placeholder='Enter Your Name'
                   onChange={(e) => setName(e.target.value)} 
                   required/>

            <input type='text' 
                   id='uname' 
                   placeholder='Enter Email Id'
                   onChange={(e) => setUname(e.target.value)}
                   required/>
            <span className='error'>{unameError}</span>

            <input type='password' 
                   id='pass' 
                   placeholder='Enter Password' 
                   onChange={(e) => setPass(e.target.value)}
                   required/>
            <span className='error'>{passError}</span>

            <button onClick={validateSignup}>Signup</button>
            <label>Already a User?<span className='span1' onClick={()=>navigate('/Login')}>Login</span></label>
        </div>

    </div>
  )
}
