import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Authentication.css';
import { userLogin, userRegister } from '../../api/api';

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(true); // Toggle between Register and Login
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const toggleForm = () => {
    setIsRegister(!isRegister);
    
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        // Register API
        const response = await  userRegister(formData)
        alert(response.data.message);
        setIsRegister(false); // Switch to login after successful registration
      } else {
        // Login API
        const response = await  userLogin(formData)

        console.log(response)
        localStorage.setItem('token', response.data.token);
        navigate('/'); // Redirect to Profile
        window.location.reload();
        
      }
      setFormData({ name: '', email: '', password: '' });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="form-container">
      <h2>{isRegister ? 'Sign Up' : 'Log in'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <button type="submit">{isRegister ? 'Sign Up' : 'Log in'}</button>
      </form>
      <p>
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <span className="toggle-link" onClick={toggleForm}>
          {isRegister ? 'Already have an Account?' : 'Create new Account'}
        </span>
      </p>
    </div>
  );
};

export default AuthPage;
