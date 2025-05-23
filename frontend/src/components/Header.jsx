import React, { useContext, useState } from 'react';
import '../cssfiles/header.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';
import axios from 'axios';

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost/factlens-backend/logout.php', {}, { withCredentials: true });
      setUser(null);
      navigate('/Login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className='header'>
      <h2 className='masked-text1'>FACTLENS</h2>
      <div className='h4s'>
        <h4 className='masked-text2' onClick={() => navigate('/')}>Home</h4>
        <h4 className='masked-text2' onClick={() => navigate('/About')}>About</h4>
        <h4 className='masked-text2' onClick={() => navigate('/Detector')}>Detector</h4>

        {user ? (
          <div className='user-dropdown'>
            <h4
              className='masked-text2'
              onClick={() => setShowDropdown(prev => !prev)}
              style={{ cursor: 'pointer' }}
            >
              Welcome, {user.name} ▼
            </h4>
            {showDropdown && (
              <div className='dropdown-content'>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <h4 className='masked-text2' onClick={() => navigate('/Login')}>Login</h4>
        )}
      </div>
    </div>
  );
}

export default Header;
