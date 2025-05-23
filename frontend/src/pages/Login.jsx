import React, { useState, useContext } from 'react';
import Header from '../components/Header';
import '../cssfiles/login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../hooks/UserContext';

export default function Login() {
  const [uname, setUname] = useState('');
  const [unameError, setUnameError] = useState('');
  const [pass, setPass] = useState('');
  const [passError, setPassError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const validateLogin = async () => {
    setUnameError('');
    setPassError('');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (uname === '' || pass === '') {
      alert('Please Fill all the Fields');
      return;
    } else if (!emailRegex.test(uname)) {
      setUnameError('Invalid Email Format');
      return;
    } else if (pass.length < 6) {
      setPassError('Password Length Should be at least 6');
      return;
    }

    try {
      const res = await axios.post('http://localhost/factlens-backend/login.php', {
        email: uname,
        password: pass,
      }, { withCredentials: true });

      console.log('Server Response:', res.data);

      if (res.data.message === 'Login Succesful') {
        setUser({ name: res.data.name, email: uname });
        alert(`Welcome, ${res.data.name}`);
        navigate('/');
      } else if (res.data.error) {
        alert(res.data.error);
      } else {
        alert('Unexpected Server Error');
      }
    } catch (err) {
      console.error('Login Error:', err);
      alert('An Error Occurred while Login');
    }
  };

  return (
    <div className='login1'>
      <Header />
      <div className='form'>
        <h3>Login</h3>
        <input type='text'
          id='uname'
          placeholder='Enter Email Id'
          onChange={(e) => setUname(e.target.value)}
          required />
        <span className='error'>{unameError}</span>

        <input type='password'
          id='pass'
          placeholder='Enter Password'
          onChange={(e) => setPass(e.target.value)}
          required />
        <span className='error'>{passError}</span>

        <button onClick={validateLogin}>Login</button>
        <label>First Time Here? <span className='span1' onClick={() => navigate('/Signup')}>Signup</span></label>
      </div>
    </div>
  );
}
